import { Injectable } from '@nestjs/common';
import { IDatabase } from 'pg-promise';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ReportsRepository {
  private db: IDatabase<any>;

  constructor(private readonly databaseService: DatabaseService) {
    this.db = databaseService.getDb();
  }

  async getSubscriptionCount(): Promise<number> {
    const result = await this.db.one<{ count: number }>(
      'SELECT COUNT(*) FROM Abonement',
    );
    return result.count;
  }

  getContractSummary(column: string) {
    return this.db.any(`
      SELECT ${column} as group_id, SUM(Total_Amount) as total_sum
      FROM Contracts
      GROUP BY ${column}
    `);
  }

  getLowStockInventory(threshold: number) {
    return this.db.any(`SELECT * FROM Inventory WHERE quantity < $1`, [
      threshold,
    ]);
  }
}
