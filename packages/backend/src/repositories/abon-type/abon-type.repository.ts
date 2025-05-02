import { Injectable } from '@nestjs/common';
import { IDatabase } from 'pg-promise';
import { DatabaseService } from 'src/database/database.service';
import { RepositoryService } from '../repository.service';
import { CreateAbonTypeDto } from './dtos/create-abon-type.dto';
import { UpdateAbonTypeDto } from './dtos/update-abon-type.dto';

@Injectable()
export class AbonementTypeRepository {
  private db: IDatabase<any>;
  private static columns = ['abonement_type', 'price'];

  constructor(
    private readonly databaseService: DatabaseService,
    private readonly repositoryService: RepositoryService,
  ) {
    this.db = databaseService.getDb();
  }

  async findAll({ sortBy, order }) {
    const query = `
        SELECT * FROM abonement_type
        ORDER BY ${sortBy} ${order}
    `;

    return await this.db.any(query);
  }

  async findOne(conditions: Record<string, any>) {
    const { whereClause, values } = this.repositoryService.getWhereClause(
      conditions,
      AbonementTypeRepository.columns,
    );

    const sql = `
        SELECT * FROM abonement_type 
        ${whereClause} LIMIT 1
    `;

    return this.db.oneOrNone(sql, values);
  }

  async create(dto: CreateAbonTypeDto) {
    try {
      const query = `
      INSERT INTO abonement_type (abonement_type, price)
      VALUES ($(abonement_type), $(price)) 
      RETURNING *
    `;
      return await this.db.one(query, dto);
    } catch (err) {
      return null;
    }
  }

  async update(abonement_type: string, dto: UpdateAbonTypeDto) {
    const query = `
      UPDATE abonement_type
      SET price = $(price)
      WHERE abonement_type = $(abonement_type)
      RETURNING *
    `;

    return await this.db.oneOrNone(query, { ...dto, abonement_type });
  }

  async delete(abonement_type: string) {
    const query = `
      DELETE FROM abonement_type
      WHERE abonement_type = $1
      RETURNING *
    `;

    return await this.db.oneOrNone(query, [abonement_type]);
  }

  static getColumns() {
    return this.columns;
  }
}
