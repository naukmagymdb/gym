import { Injectable, NotFoundException } from '@nestjs/common';
import { Role } from 'src/auth/utils/role.enum';
import { DatabaseService } from 'src/database/services/database/database.service';

@Injectable()
export class AdminsService {
    constructor(
        private readonly databaseService: DatabaseService
    ) { }

    async getAdminDashboard(phone: string, role: Role) {
        const admin = await this.getAdminByPhone(phone);
        if (!admin) throw new NotFoundException('Admin Not Found!');

        return admin;
    }

    async getAdminByPhone(phone: string) {
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
