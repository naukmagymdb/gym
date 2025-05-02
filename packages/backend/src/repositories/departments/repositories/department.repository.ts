import { Injectable } from '@nestjs/common';
import { IDatabase } from 'pg-promise';
import { DatabaseService } from 'src/database/database.service';
import { RepositoryService } from 'src/repositories/repository.service';
import { CreateDepartmentDto } from '../dtos/create-department.dto';
import { DepartmentResponseDto } from '../dtos/department-response.dto';
import { UpdateDepartmentDto } from '../dtos/update-department.dto';
import { DepartmentHandler } from './department.handler';

@Injectable()
export class DepartmentRepository {
  private db: IDatabase<any>;
  private nestedGetQueryPart: string = `
    SELECT
      d.department_id,
      d.address,
      COALESCE(
        (SELECT array_agg(pn.phone_number)
        FROM department_phone_number pn
        WHERE pn.department_id = d.department_id), '{}') AS phone_numbers,
      COALESCE(
        (SELECT array_agg(de.email)
        FROM department_email de
        WHERE de.department_id = d.department_id), '{}') AS emails
      FROM department d
  `;

  constructor(
    private readonly databaseService: DatabaseService,
    private readonly departmentHandler: DepartmentHandler,
    private readonly repositoryService: RepositoryService,
  ) {
    this.db = databaseService.getDb();
  }

  async findAll({ sortBy, order }) {
    const query = `
      ${this.nestedGetQueryPart}
      ORDER BY ${sortBy} ${order}
    `;

    return await this.db.any(query);
  }

  async findOne(condition: Record<string, any>) {
    const { whereClause, values } = this.repositoryService.getWhereClause(
      condition,
      ['department_id', 'address'],
    );

    const query = `
      ${this.nestedGetQueryPart}
      ${whereClause}
      LIMIT 1
    `;

    return await this.db.oneOrNone(query, values);
  }

  async create(dto: CreateDepartmentDto) {
    try {
      const query = `
      INSERT INTO department (address)
      VALUES ($(address)) 
      RETURNING *
    `;
      const depInfo = await this.db.one(query, dto);

      const response: DepartmentResponseDto = {
        ...depInfo,
        phone_numbers: [],
        emails: [],
      };

      const emailResults = await this.departmentHandler.handleCreate(
        'emails',
        depInfo.department_id,
        dto.emails,
      );
      response.emails = emailResults.map((item) => item.email);

      const phoneResults = await this.departmentHandler.handleCreate(
        'phone_numbers',
        depInfo.department_id,
        dto.phone_numbers,
      );
      response.phone_numbers = phoneResults.map((item) => item.phone_number);

      return response;
    } catch (err) {
      throw err;
    }
  }

  async update(
    id: number,
    { address, emails, phone_numbers }: UpdateDepartmentDto,
  ) {
    if (address) {
      await this.db.none(
        `UPDATE department SET address = $1 WHERE department_id = $2`,
        [address, id],
      );
    }

    if (emails) {
      await this.departmentHandler.handleUpdate('emails', id, emails);
    }

    if (phone_numbers) {
      await this.departmentHandler.handleUpdate(
        'phone_numbers',
        id,
        phone_numbers,
      );
    }

    return this.findOne({ department_id: id });
  }

  async delete(id: number) {
    const query = `
      DELETE FROM department
      WHERE department_id = $(id)
      RETURNING *
    `;
    const result = await this.db.one(query, { id });
    return result;
  }

  async getManagersInfo(
    department_id: number,
    sortOptions: Record<string, string>,
  ) {
    const query = `
      SELECT 
        s.id AS manager_id,
        s.phone_num,
        s.department_id,
        d.address AS department_address,
        COUNT(sms.subordinate_id) AS subordinate_count
      FROM Staff_Manager_Subordinate sms
      JOIN Staff s ON sms.Manager_ID = s.ID
      JOIN Department d ON s.Department_id = d.Department_id
      WHERE s.Department_id = $1
      GROUP BY s.ID, s.Phone_num, s.Department_id, d.Address
      ORDER BY ${sortOptions.sortBy} ${sortOptions.order};
    `;

    return await this.db.any(query, [department_id]);
  }
}
