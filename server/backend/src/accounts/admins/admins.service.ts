import { Injectable, NotFoundException } from '@nestjs/common';
import { Role } from 'src/auth/utils/role.enum';
import { DashboardStrategy } from 'src/common/interfaces/DashboardStrategy.interface';
import { PhoneLookupStrategy } from 'src/common/interfaces/PhoneLookupStrategy.interface';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class AdminsService implements PhoneLookupStrategy, DashboardStrategy {
    constructor(
        private readonly databaseService: DatabaseService
    ) { }

    async getDashboard(phone: string) {
        const admin = await this.getByPhone(phone);
        if (!admin) throw new NotFoundException('Admin Not Found!');

        return admin;
    }

    async getByPhone(phone: string) {
        const pool = this.databaseService.getPool();

        const res = await pool.query(
            "SELECT * FROM staff WHERE phone_num = $1",
            [phone]
        );
        const admin = res.rows[0];

        if (!admin) return null;
        return {
            role: Role.Admin,
            ...admin
        }
    }
}
