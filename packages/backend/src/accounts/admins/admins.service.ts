import { Injectable, NotFoundException } from '@nestjs/common';
import { AccountStrategy } from 'src/common/strategies/account.strategy';
import { DatabaseService } from 'src/database/database.service';
import { UpdateStaffDto } from 'src/database/dtos/update-staff.dto';
import { UtilsService } from '../services/utils.service';


@Injectable()
export class AdminsService implements AccountStrategy {
    constructor(
        private readonly databaseService: DatabaseService,
        private readonly utilsService: UtilsService
    ) { }

    async getDashboard(id: number) {
        const admin = await this.getById(id);
        if (!admin) throw new NotFoundException('Admin Not Found!');
        return admin;
    }

    async updateInfo(id: number, updateDto: UpdateStaffDto): Promise<any> {
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
            "SELECT * FROM staff WHERE phone_num = $1",
            [phone]
        );
        const admin = res.rows[0];

        if (!admin) return null;
        return admin;
    }

    async getById(id: number) {
        const pool = this.databaseService.getPool();

        const res = await pool.query(
            "SELECT * FROM staff WHERE id = $1",
            [id]
        );
        const admin = res.rows[0];

        if (!admin) return null;
        return admin;
    }
}
