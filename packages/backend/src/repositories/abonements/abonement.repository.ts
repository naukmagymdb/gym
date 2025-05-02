import { Injectable } from '@nestjs/common';
import { IDatabase } from 'pg-promise';
import { DatabaseService } from 'src/database/database.service';
import { RepositoryService } from '../repository.service';
import { CreateAbonementDto } from './dtos/create-abonement.dto';
import { UpdateAbonementDto } from './dtos/update-abonement.dto';

@Injectable()
export class AbonementRepository {
  private db: IDatabase<any>;
  private static columns = [
    'abonement_id',
    'start_date',
    'end_date',
    'is_active',
    'visitor_id ',
    'abonement_type',
    'department_id',
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
    const { whereClause, values } = this.repositoryService.getWhereClause(
      queries,
      AbonementRepository.columns,
    );

    const sql = `
    SELECT * FROM abonement
    ${whereClause}
    ORDER BY ${sortOptions.sortBy} ${sortOptions.order}
  `;

    return await this.db.any(sql, values);
  }

  async findOne(conditions: Record<string, any>) {
    const { whereClause, values } = this.repositoryService.getWhereClause(
      conditions,
      AbonementRepository.columns,
    );

    const sql = `
        SELECT * FROM abonement 
        ${whereClause} LIMIT 1
    `;
    console.log(conditions);
    return this.db.oneOrNone(sql, values);
  }

  async create(dto: CreateAbonementDto) {
    try {
      const query = `
        INSERT INTO Abonement (start_date, end_date, is_active, visitor_id, abonement_type, department_id)
        VALUES ($(start_date), $(end_date), $(is_active), $(visitor_id), $(abonement_type), $(department_id)) RETURNING *
      `;

      return await this.db.one(query, dto);
    } catch (err) {
      return null;
    }
  }

  async update(id: number, dto: UpdateAbonementDto) {
    const { setClause, values } = this.repositoryService.prepareUpdateData(dto);
    console.log(dto);
    console.log(setClause);

    if (setClause.length === 0) {
      throw new Error('No fields to update');
    }

    const query = `
        UPDATE abonement
        SET ${setClause.join(', ')}
        WHERE abonement_id = $(id)
        RETURNING *
      `;

    return await this.db.oneOrNone(query, { ...values, id });
  }

  async delete(id: number) {
    const sql = `
        DELETE FROM abonement
        WHERE abonement_id = $1
        RETURNING *;
      `;

    return await this.db.oneOrNone(sql, [id]);
  }

  static getColumns() {
    return this.columns;
  }
}
