import { Injectable, NotFoundException } from '@nestjs/common';
import { Role } from 'src/auth/utils/role.enum';
import { DashboardStrategy } from 'src/common/interfaces/DashboardStrategy.interface';
import { PhoneLookupStrategy } from 'src/common/interfaces/PhoneLookupStrategy.interface';
import { DatabaseService } from 'src/database/database.service';


@Injectable()
export class UsersService implements PhoneLookupStrategy, DashboardStrategy {
    constructor(
        private readonly databaseService: DatabaseService
    ) { }

    async getDashboard(phone: string) {
        const user = await this.getByPhone(phone);
        if (!user) throw new NotFoundException('User Not Found!');

        return user;
    }

    async getByPhone(phone: string) {
        const pool = this.databaseService.getPool();

        const res = await pool.query(
            "SELECT * FROM visitor WHERE phone_num = $1",
            [phone]
        );
        const user = res.rows[0];
        
        if (!user) return null;
        return {
            role: Role.User,
            ...user
        }
    }
}
