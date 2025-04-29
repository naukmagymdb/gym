import { Injectable } from '@nestjs/common';
import { IDatabase } from 'pg-promise';
import { DatabaseService } from 'src/database/database.service';
import { RepositoryService } from '../repository.service';
import { CreateReadTrainingDto } from './dtos/create-read-training.dto';
import { UpdateTrainingDto } from './dtos/update-training.dto';

@Injectable()
export class TrainingRepository {
  private db: IDatabase<any>;

  constructor(
    private readonly databaseService: DatabaseService,
    private readonly repositoryService: RepositoryService,
  ) {
    this.db = databaseService.getDb();
  }

  async findAll({
    visitorId,
    staffId,
    dateFrom,
    dateTo,
    sortBy,
    order,
  }: {
    visitorId?: number;
    staffId?: number;
    dateFrom?: string;
    dateTo?: string;
    sortBy?: string;
    order?: 'asc' | 'desc';
  }) {
    const conditions: string[] = [];
    const values: any = {};

    if (visitorId) {
      conditions.push('Visitor_ID = $(visitorId)');
      values.visitorId = visitorId;
    }
    if (staffId) {
      conditions.push('Staff_ID = $(staffId)');
      values.staffId = staffId;
    }
    if (dateFrom) {
      conditions.push('Date_Of_Begin >= $(dateFrom)');
      values.dateFrom = dateFrom;
    }
    if (dateTo) {
      conditions.push('Date_Of_End <= $(dateTo)');
      values.dateTo = dateTo;
    }

    const whereClause = conditions.length
      ? `WHERE ${conditions.join(' AND ')}`
      : '';

    const sql = `
      SELECT * FROM training
      ${whereClause}
      ORDER BY ${sortBy} ${order}
    `;

    return await this.db.any(sql, values);
  }

  async findOne(lookup: CreateReadTrainingDto) {
    const sql = `
      SELECT * FROM training
      WHERE Visitor_ID = $(visitorId)
        AND Staff_ID = $(staffId)
        AND Date_Of_Begin = $(dateFrom)
        AND Date_Of_End = $(dateTo)
    `;

    return await this.db.oneOrNone(sql, lookup);
  }

  async create(createTrainingDto: CreateReadTrainingDto) {
    const sql = `
        INSERT INTO training 
          (Visitor_ID, Staff_ID, Date_Of_Begin, Date_Of_End) 
        VALUES 
          ($(visitorId), $(staffId), $(dateFrom), $(dateTo)) 
        RETURNING *
      `;

    return await this.db.one(sql, createTrainingDto);
  }

  async update(lookup: CreateReadTrainingDto, updateDto: UpdateTrainingDto) {
    const { setClause, values } = this.repositoryService.prepareUpdateData({
      Staff_ID: updateDto.staffId,
      Date_Of_Begin: updateDto.dateFrom,
      Date_Of_End: updateDto.dateTo,
    });

    if (setClause.length === 0) {
      throw new Error('No fields to update');
    }

    const sql = `
      UPDATE training
      SET ${setClause.join(', ')}
      WHERE Visitor_ID = $(visitorId)
        AND Staff_ID = $(staffId)
        AND Date_Of_Begin = $(dateFrom)
        AND Date_Of_End = $(dateTo)
      RETURNING *;
    `;

    return await this.db.oneOrNone(sql, { ...values, ...lookup });
  }

  async delete(lookup: CreateReadTrainingDto) {
    const sql = `
      DELETE FROM training
      WHERE Visitor_ID = $(visitorId)
        AND Staff_ID = $(staffId)
        AND Date_Of_Begin = $(dateFrom)
        AND Date_Of_End = $(dateTo)
      RETURNING *;
    `;

    return await this.db.oneOrNone(sql, lookup);
  }

  async findByVisitorId(visitorId: number) {
    const sql = `
      SELECT * FROM training
      WHERE Visitor_ID = $1
      ORDER BY Date_Of_Begin asc
    `;
    return this.db.any(sql, [visitorId]);
  }
}
