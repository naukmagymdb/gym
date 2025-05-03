import { BadRequestException, Injectable } from '@nestjs/common';
import { IDatabase } from 'pg-promise';
import { DatabaseService } from 'src/database/database.service';
import { RepositoryService } from '../repository.service';
import { CreateTrainingDto } from './dtos/create-training.dto';
import { TrainingResponseDto } from './dtos/training-response.dto';
import { UpdateTrainingDto } from './dtos/update-training.dto';

@Injectable()
export class TrainingRepository {
  private db: IDatabase<any>;
  private static columns = [
    'id',
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
  }): Promise<TrainingResponseDto[]> {
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

  async findOne(condition: Record<string, any>): Promise<TrainingResponseDto> {
    const { whereClause, values } = this.repositoryService.getWhereClause(
      condition,
      TrainingRepository.columns,
    );
    const sql = `SELECT * FROM training ${whereClause} LIMIT 1`;

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

  async update(id: number, updateDto: UpdateTrainingDto) {
    const { setClause, values } =
      this.repositoryService.prepareUpdateData(updateDto);

    if (setClause.length === 0) {
      throw new Error('No fields to update');
    }

    try {
      const sql = `
        UPDATE training
        SET ${setClause.join(', ')}
        WHERE id = $(id)
        RETURNING *;
    `;

      return await this.db.oneOrNone(sql, { ...values, id });
    } catch (err) {
      return null;
    }
  }

  async delete(id: number) {
    const sql = `
      DELETE FROM training
      WHERE id = $1
      RETURNING *;
    `;

    return await this.db.oneOrNone(sql, [id]);
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
