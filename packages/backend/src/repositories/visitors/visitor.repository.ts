import { BadRequestException, Injectable } from '@nestjs/common';
import pgPromise from 'pg-promise';
import { encodePassword } from 'src/common/utils/bcrypt';
import { DatabaseService } from 'src/database/database.service';
import { CreateVisitorDto } from './dtos/create-visitor.dto';
import { UpdateVisitorDto } from './dtos/update-visitor.dto';

@Injectable()
export class VisitorRepository {
  private db: pgPromise.IDatabase<any>;

  constructor(private readonly databaseService: DatabaseService) {
    this.db = databaseService.getDb();
  }

  async findAll({
    sortBy,
    order,
  }: {
    sortBy?: string;
    order?: 'asc' | 'desc';
  }) {
    const sql = `
      SELECT * FROM visitor
      ORDER BY ${sortBy} ${order}
    `;
    return await this.db.any(sql, { sortBy, order });
  }

  async findById(id: number) {
    const sql = 'SELECT * FROM visitor WHERE id = $1';
    return await this.db.oneOrNone(sql, [id]);
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
    return await this.db.one(sql, createVisitorDto);
  }

  async update(id: number, updateVisitorDto: UpdateVisitorDto) {
    if (updateVisitorDto.login_password) {
      updateVisitorDto.login_password = encodePassword(
        updateVisitorDto.login_password,
      );
    }

    const setClause = [];
    const values = { id };
    for (const [key, value] of Object.entries(updateVisitorDto)) {
      if (value !== undefined && value !== null) {
        setClause.push(`${key} = $(${key})`);
        values[key] = value;
      }
    }

    if (setClause.length === 0)
      throw new BadRequestException('No fields to update');

    const sql = `
      UPDATE visitor
      SET ${setClause.join(', ')}
      WHERE id = $(id)
      RETURNING *
    `;
    return await this.db.oneOrNone(sql, values);
  }

  async delete(id: number) {
    const sql = 'DELETE FROM visitor WHERE id = $(id) RETURNING *';
    return await this.db.oneOrNone(sql, { id });
  }
}
