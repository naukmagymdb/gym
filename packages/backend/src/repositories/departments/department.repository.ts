import { Injectable } from '@nestjs/common';
import { IDatabase } from 'pg-promise';
import { DatabaseService } from 'src/database/database.service';
import { DepartmentDto } from './dtos/department.dto';

@Injectable()
export class DepartmentRepository {
  private db: IDatabase<any>;

  constructor(private readonly databaseService: DatabaseService) {
    this.db = databaseService.getDb();
  }

  async findAll({
    sortBy = 'department_id',
    order = 'asc'
  }: {
    sortBy?: 'department_id' | 'address';
    order?: 'asc' | 'desc';
  }) {

    const query = `
      SELECT * FROM department
      ORDER BY ${sortBy} ${order.toUpperCase()} 
    `;

    return await this.db.any(query);
  }

  async findById(id: number) {
    const query = 'SELECT * FROM department WHERE department_id = $1';
    const result = await this.db.oneOrNone(query, [id]);
    return result || null;
  }

  async create(dto: DepartmentDto) {
    const query = `
      INSERT INTO department (address)
      VALUES ($(address)) 
      RETURNING *
    `;
    const result = await this.db.one(query, dto);
    return result;
  }

  async update(id: number, dto: DepartmentDto) {
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
