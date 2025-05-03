import { BadRequestException, Injectable } from '@nestjs/common';
import pgPromise from 'pg-promise';
import { encodePassword } from 'src/common/utils/bcrypt';
import { DatabaseService } from 'src/database/database.service';
import { RepositoryService } from '../repository.service';
import { CreateVisitorDto } from './dtos/create-visitor.dto';
import { UpdateVisitorDto } from './dtos/update-visitor.dto';

@Injectable()
export class VisitorRepository {
  private db: pgPromise.IDatabase<any>;
  private static columns = [
    'id',
    'birth_date',
    'visitor_name',
    'surname',
    'patronymic',
    'phone_num',
    'email',
    'age',
  ];

  constructor(
    private readonly databaseService: DatabaseService,
    private readonly repositoryService: RepositoryService,
  ) {
    this.db = databaseService.getDb();
  }

  async findAll({
    queries,
    sortOptions,
  }: {
    queries: Record<string, any>;
    sortOptions: { sortBy: string; order: string };
  }) {
    let whereClause = '';
    if (queries.abonement_type) {
      whereClause += `WHERE a.abonement_type = $(abonement_type)`;
    }
    if (queries.is_active != null) {
      whereClause += queries.abonement_type
        ? ` AND a.is_active = $(is_active)`
        : `WHERE a.is_active = $(is_active)`;
    }

    const query = `
        ${this.getQueryPart(whereClause)}
        ORDER BY v.${sortOptions.sortBy} ${sortOptions.order}
      `;

    return await this.db.any(query, { whereClause, ...queries });
  }

  async findOne(condition: Record<string, any>) {
    const { whereClause, values } = this.repositoryService.getWhereClause(
      condition,
      VisitorRepository.columns,
    );

    const query = `
      ${this.getQueryPart(whereClause)}
      LIMIT 1
    `;

    return await this.db.oneOrNone(query, values);
  }

  async create(createVisitorDto: CreateVisitorDto) {
    createVisitorDto.login_password = encodePassword(
      createVisitorDto.login_password,
    );

    const sql = `
      INSERT INTO visitor 
        (visitor_name, surname, patronymic, phone_num, email, birth_date, login_password) 
      VALUES 
        ($(visitor_name), $(surname), $(patronymic), $(phone_num), $(email), $(birth_date), $(login_password)) 
      RETURNING *
    `;
    try {
      return await this.db.one(sql, createVisitorDto);
    } catch (err) {
      return null;
    }
  }

  async update(id: number, updateVisitorDto: UpdateVisitorDto) {
    if (updateVisitorDto.login_password) {
      updateVisitorDto.login_password = encodePassword(
        updateVisitorDto.login_password,
      );
    }

    const { setClause, values } =
      this.repositoryService.prepareUpdateData(updateVisitorDto);

    if (setClause.length === 0)
      throw new BadRequestException('No fields to update');

    const sql = `
      UPDATE visitor
      SET ${setClause.join(', ')}
      WHERE id = ${id}
      RETURNING *
    `;
    return await this.db.oneOrNone(sql, values);
  }

  async delete(id: number) {
    const sql = 'DELETE FROM visitor WHERE id = $(id) RETURNING *';
    return await this.db.oneOrNone(sql, { id });
  }

  static getColumns() {
    return this.columns;
  }

  private getQueryPart(whereClause: string): string {
    return `
      SELECT v.id,
        v.visitor_name,
        v.surname,
        v.patronymic,
        v.phone_num,
        v.email,
        v.age,
        v.login_password,
        COALESCE(
          json_agg(
            json_build_object(
              'abonement_id', a.abonement_id,
              'start_date', a.start_date,
              'end_date', a.end_date,
              'is_active', a.is_active,
              'abonement_type', a.abonement_type,
              'department_id', a.department_id,
              'department_address', d.address
            ) 
          ) FILTER (WHERE a.abonement_id IS NOT NULL),
          '[]'::json  
        ) AS abonements
      FROM visitor_with_age v
      LEFT JOIN abonement a ON v.id = a.visitor_id
      LEFT JOIN department d ON a.department_id = d.department_id
      ${whereClause}
      GROUP BY v.id, v.visitor_name, v.surname, v.patronymic, v.phone_num, v.email, v.age, v.login_password
    `;
  }
}
