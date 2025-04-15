import { Injectable } from "@nestjs/common";
import { AdminsService } from "src/admins/services/admins/admins.service";
import { Role } from "src/auth/utils/role.enum";
import { UsersService } from "src/users/services/users/users.service";

@Injectable()
export class AuthHelperService {
    constructor(
        private readonly adminsService: AdminsService, 
        private readonly usersService: UsersService
    ) { }

    async getByPhone(role: Role, phone: string) {
        if (role === Role.User) {
            return this.usersService.getUserByPhone(phone);
        } else if (role === Role.Admin) {
            return this.adminsService.getAdminByPhone(phone);
        }
    }
}