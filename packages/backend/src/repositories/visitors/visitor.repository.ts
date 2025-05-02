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
  ];

  constructor(
    private readonly databaseService: DatabaseService,
    private readonly repositoryService: RepositoryService,
  ) {
    this.db = databaseService.getDb();
  }

  async findAll({ sortBy, order }: { sortBy?: string; order?: string }) {
    const sql = `
      SELECT * FROM visitor_with_age
      ORDER BY ${sortBy} ${order}
    `;
    return await this.db.any(sql, { sortBy, order });
  }

  async findOne(condition: Record<string, any>) {
    const keys = Object.keys(condition);
    const values = Object.values(condition);

    const whereClause = keys
      .map((key, i) => `${key} = $${i + 1}`)
      .join(' AND ');
    const sql = `SELECT * FROM visitor_with_age WHERE ${whereClause} LIMIT 1`;

    return this.db.oneOrNone(sql, values);
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
}
