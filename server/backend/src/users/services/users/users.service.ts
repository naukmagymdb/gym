import { Injectable, NotFoundException } from '@nestjs/common';
import { Role } from 'src/auth/utils/role.enum';
import { DatabaseService } from 'src/database/services/database/database.service';


@Injectable()
export class UsersService {
    constructor(
        private readonly databaseService: DatabaseService
    ) { }

    async getUserDashboard(phone: string) {
        const user = await this.getUserByPhone(phone);
        if (!user) throw new NotFoundException('User Not Found!');

        return user;
    }

    async getUserByPhone(phone: string) {
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
