import { Injectable } from '@nestjs/common';
import { IDatabase } from 'pg-promise';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class DepartmentPhoneRepository {
  private db: IDatabase<any>;

  constructor(private readonly databaseService: DatabaseService) {
    this.db = databaseService.getDb();
  }

  async create(departmentId: number, phoneNumber: string): Promise<any> {
    try {
      const query = `
      INSERT INTO department_phone_number (phone_number, department_id)
      VALUES ($1, $2)
      RETURNING phone_number
    `;
      return await this.db.one(query, [phoneNumber, departmentId]);
    } catch (err) {
      return null;
    }
  }

  async deleteByDepartmentId(departmentId: number): Promise<void> {
    await this.db.none(
      `DELETE FROM department_phone_number WHERE department_id = $1`,
      [departmentId],
    );
  }
}
