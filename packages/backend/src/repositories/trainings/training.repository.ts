import { BadRequestException, Injectable } from '@nestjs/common';
import { IDatabase } from 'pg-promise';
import { DatabaseService } from 'src/database/database.service';
import { RepositoryService } from '../repository.service';
import { CreateTrainingDto } from './dtos/create-training.dto';
import { TrainingLookupDto } from './dtos/training-lookup.dto';
import { UpdateTrainingDto } from './dtos/update-training.dto';

@Injectable()
export class TrainingRepository {
  private db: IDatabase<any>;
  private static columns = [
    'visitor_id',
    'staff_id',
    'date_of_begin',
    'date_of_end',
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
      TrainingRepository.columns,
    );

    const sql = `
      SELECT * FROM training
      ${whereClause}
      ORDER BY ${sortOptions.sortBy} ${sortOptions.order}
    `;

    return await this.db.any(sql, values);
  }

  async findOne(condition: Record<string, any>) {
    const keys = Object.keys(condition);
    const values = Object.values(condition);

    const whereClause = keys
      .map((key, i) => `${key} = $${i + 1}`)
      .join(' AND ');
    const sql = `SELECT * FROM training WHERE ${whereClause} LIMIT 1`;

    return this.db.oneOrNone(sql, values);
  }

  async create(createTrainingDto: CreateTrainingDto) {
    const coach = await this.db.oneOrNone(
      `SELECT id FROM staff WHERE id = $1 AND qualification_cert_number_of_coach IS NOT NULL`,
      [createTrainingDto.staff_id],
    );

    if (!coach) {
      throw new BadRequestException(
        'Selected staff member is not a certified coach',
      );
    }

    try {
      const sql = `
        INSERT INTO training 
          (visitor_id, staff_id, date_of_begin, date_of_end) 
        VALUES 
          ($(visitor_id), $(staff_id), $(date_of_begin), $(date_of_end)) 
        RETURNING *
      `;
      return await this.db.one(sql, createTrainingDto);
    } catch (err) {
      throw err;
    }
  }

  async update(lookup: TrainingLookupDto, updateDto: UpdateTrainingDto) {
    const { setClause, values } =
      this.repositoryService.prepareUpdateData(updateDto);

    if (setClause.length === 0) {
      throw new Error('No fields to update');
    }

    try {
      const sql = `
        UPDATE training
        SET ${setClause.join(', ')}
        WHERE visitor_id = $(visitor_id)
          AND date_of_begin = $(date_of_begin)
          AND date_of_end = $(date_of_end)
        RETURNING *;
    `;

      return await this.db.oneOrNone(sql, { ...values, ...lookup });
    } catch (err) {
      return null;
    }
  }

  async delete(lookup: TrainingLookupDto) {
    const sql = `
      DELETE FROM training
      WHERE visitor_id = $(visitor_id)
        AND date_of_begin = $(date_of_begin)
        AND date_of_end = $(date_of_end)
      RETURNING *;
    `;

    return await this.db.oneOrNone(sql, lookup);
  }

  async findByVisitorId(visitorId: number) {
    const sql = `
      SELECT * FROM training
      WHERE visitor_id = $1
      ORDER BY date_of_begin asc
    `;
    return this.db.any(sql, [visitorId]);
  }

  static getColumns() {
    return this.columns;
  }
}
