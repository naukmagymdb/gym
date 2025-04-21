import { Injectable, NotFoundException } from '@nestjs/common';
import { AccountStrategy } from 'src/common/strategies/account.strategy';
import { DatabaseService } from 'src/database/database.service';
import { UpdateVisitorDto } from 'src/database/dtos/update-visitor.dto';
import { UtilsService } from '../services/utils.service';


@Injectable()
export class UsersService implements AccountStrategy {
    constructor(
        private readonly databaseService: DatabaseService,
        private readonly utilsService: UtilsService
    ) { }

    async getDashboard(id: number) {
        const user = await this.getById(id);
        if (!user) throw new NotFoundException('User Not Found!');

        return user;
    }

    async updateInfo(id: number, updateDto: UpdateVisitorDto): Promise<any> {
        const pool = this.databaseService.getPool();

        const { values, rawQuery } = this.utilsService.prepareUpdateData(updateDto);
        const query = rawQuery.replace('$1', 'staff')

        try {
            const res = await pool.query(
                query,
                [...values, id]
            );
            return res.rows[0];
        } catch (error) {
            console.error('Error executing query:', error);
            throw new Error('Failed to update the record.');
        }
    }

    async getByPhone(phone: string) {
        const pool = this.databaseService.getPool();

        const res = await pool.query(
            "SELECT * FROM visitor WHERE phone_num = $1",
            [phone]
        );
        const user = res.rows[0];

        if (!user) return null;
        return user;
    }

    async getById(id: number) {
        const pool = this.databaseService.getPool();

        const res = await pool.query(
            "SELECT * FROM visitor WHERE id = $1",
            [id]
        );
        const user = res.rows[0];

        if (!user) return null;
        return user;
    }
}
