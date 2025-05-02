import { Injectable } from '@nestjs/common';
import { IDatabase } from 'pg-promise';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class DepartmentEmailRepository {
  private db: IDatabase<any>;

  constructor(private readonly databaseService: DatabaseService) {
    this.db = databaseService.getDb();
  }

  async create(departmentId: number, email: string): Promise<any> {
    try {
      const query = `
      INSERT INTO department_email (email, department_id)
      VALUES ($1, $2)
      RETURNING email
    `;
      return await this.db.one(query, [email, departmentId]);
    } catch (err) {
      return null;
    }
  }

  async deleteByDepartmentId(departmentId: number): Promise<void> {
    await this.db.none(
      `DELETE FROM department_email WHERE department_id = $1`,
      [departmentId],
    );
  }
}
