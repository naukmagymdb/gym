import { Injectable } from '@nestjs/common';
import { AdminsService } from 'src/admins/services/admins/admins.service';
import { Role } from 'src/auth/utils/role.enum';
import { DatabaseService } from 'src/database/services/database/database.service';
import { UsersService } from 'src/users/services/users/users.service';


@Injectable()
export class IndexService {
    constructor(
        private readonly adminsService: AdminsService,
        private readonly usersService: UsersService,
        private readonly databaseService: DatabaseService
    ) { }

    getDashboard(role: Role, phone: string) {
        if (role === Role.User) {
            return this.usersService.getUserDashboard(phone);
        } else if (role === Role.Admin) {
            return this.adminsService.getAdminDashboard(phone, role);
        }
    }

    async testFunc() {
        const pool = this.databaseService.getPool();
        const client = await pool.connect();

        try {
            const resVisitors = await client.query('SELECT * FROM visitor');
            const resDepartments = await client.query('SELECT * FROM department');
            const resStaff = await client.query('SELECT * FROM staff');
    
            return {
                visitors: resVisitors.rows,
                departments: resDepartments.rows,
                staff: resStaff.rows
            };
        } finally {
            client.release();
        }
    }
}
