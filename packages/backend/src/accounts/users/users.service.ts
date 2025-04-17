import { Injectable, NotFoundException } from '@nestjs/common';
import { Role } from 'src/auth/utils/role.enum';
import { AccountStrategy } from 'src/common/interfaces/account.strategy';
import { DatabaseService } from 'src/database/database.service';


@Injectable()
export class UsersService implements AccountStrategy {
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
