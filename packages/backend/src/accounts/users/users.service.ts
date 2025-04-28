import { Injectable, NotFoundException } from '@nestjs/common';
import { AccountStrategy } from 'src/common/strategies/account.strategy';
import { DatabaseService } from 'src/database/database.service';
import { UpdateVisitorDto } from 'src/repositories/visitors/dtos/update-visitor.dto';
import { UtilsService } from '../services/utils.service';

@Injectable()
export class UsersService implements AccountStrategy {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly utilsService: UtilsService,
  ) {}

  async getDashboard(id: number) {
    const user = await this.getById(id);
    if (!user) throw new NotFoundException('User Not Found!');

    return user;
  }

  async updateInfo(id: number, updateDto: UpdateVisitorDto): Promise<any> {
    const db = this.databaseService.getDb();

    const { values, rawQuery } = this.utilsService.prepareUpdateData(updateDto);
    const query = rawQuery.replace('$temp', 'visitor');

    const res = await db.oneOrNone(query, [...values, id]);
    return res || null;
  }

  async getByPhone(phone: string) {
    const db = this.databaseService.getDb();

    const res = await db.oneOrNone(
      'SELECT * FROM visitor WHERE phone_num = $1',
      [phone],
    );
    return res || null;
  }

  async getById(id: number) {
    const db = this.databaseService.getDb();

    const res = await db.oneOrNone(
      'SELECT * FROM visitor WHERE id = $1', 
      [id]
    );
    return res || null;
  }
}
