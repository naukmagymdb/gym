import { Injectable } from '@nestjs/common';
import pgPromise from 'pg-promise';
import { DatabaseService } from 'src/database/database.service';
import { CreateVisitorDto } from './dtos/create-visitor.dto';
import { UpdateVisitorDto } from './dtos/update-visitor.dto';
import { encodePassword } from 'src/common/utils/bcrypt';

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
    createVisitorDto.login_password = encodePassword(createVisitorDto.login_password);

    const sql = `
      INSERT INTO visitor 
        (first_name, last_name, patronymic, phone_num, email, birth_date, login_password) 
      VALUES 
        ($(first_name), $(last_name), $(patronymic), $(phone_num), $(email), $(birth_date), $(login_password)) 
      RETURNING *
    `;
    return await this.db.one(sql, createVisitorDto);
  }

  async update(id: number, updateVisitorDto: UpdateVisitorDto) {
    if (updateVisitorDto.login_password) {
      updateVisitorDto.login_password = encodePassword(updateVisitorDto.login_password);
    }

    const sql = `
      UPDATE visitor SET 
        first_name = COALESCE($(first_name), first_name),
        last_name = COALESCE($(last_name), last_name),
        patronymic = COALESCE($(patronymic), patronymic),
        phone_num = COALESCE($(phone_num), phone_num),
        email = COALESCE($(email), email),
        birth_date = COALESCE($(birth_date), birth_date),
        login_password = COALESCE($(login_password), login_password)
      WHERE id = $(id)
      RETURNING *
    `;
    return await this.db.one(sql, { ...updateVisitorDto, id });
  }

  async delete(id: number) {
    const sql = 'DELETE FROM visitor WHERE id = $(id) RETURNING *';
    return await this.db.one(sql, { id });
  }
}