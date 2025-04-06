import { Injectable } from '@nestjs/common';
import { AdminsService } from 'src/admins/services/admins/admins.service';
import { UsersService } from 'src/users/services/users/users.service';

@Injectable()
export class IndexService {
    constructor(
        private readonly adminsService: AdminsService,
        private readonly usersService: UsersService
    ) {}

    getDashboard(role: string, id) {
        if (role === 'admin') {
            return this.adminsService.getAdminDashboard(id);
        } else {
            return this.usersService.getUserDashboard(id);
        }
    }
}
