import { Injectable } from '@nestjs/common';
import { IDatabase } from 'pg-promise';
import { DatabaseService } from 'src/database/database.service';
import { CreateDepartmentDto } from '../dtos/create-department.dto';
import { DepartmentResponseDto } from '../dtos/department-response.dto';
import { DepartmentHandler } from './department.handler';

@Injectable()
export class DepartmentRepository {
  private db: IDatabase<any>;

  constructor(
    private readonly databaseService: DatabaseService,
    private readonly departmentHandler: DepartmentHandler,
    // private readonly departmentEmailRepository: DepartmentEmailRepository,
    // private readonly departmentPhoneRepository: DepartmentPhoneRepository,
  ) {
    this.db = databaseService.getDb();
  }

  async findAll({ sortBy, order }) {
    const query = `
      SELECT * FROM department
      ORDER BY ${sortBy} ${order} 
    `;

    return await this.db.any(query);
  }

  async findById(id: number) {
    const query = 'SELECT * FROM department WHERE department_id = $1';
    const result = await this.db.oneOrNone(query, [id]);
    return result || null;
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
      console.log(response);

      return response;
    } catch (err) {
      throw err;
    }
  }

  async update(id: number, dto: CreateDepartmentDto) {
    const query = `
      UPDATE department
      SET address = $(address)
      WHERE department_id = $(id)
      RETURNING *
    `;
    const result = await this.db.one(query, { ...dto, id });
    return result;
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
}
