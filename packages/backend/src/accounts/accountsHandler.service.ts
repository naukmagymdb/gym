import { Injectable } from "@nestjs/common";
import { Role } from "src/auth/utils/role.enum";
import { AdminsService } from "./admins/admins.service";
import { UsersService } from "./users/users.service";
import { AccountStrategy } from "src/common/interfaces/account.strategy";

@Injectable()
export class AccountsHandler {
    private strategies: Record<Role, AccountStrategy>
    
        constructor(
            private readonly adminsService: AdminsService,
            private readonly usersService: UsersService
        ) { 
            this.strategies = {
                [Role.User]: usersService,
                [Role.Admin]: adminsService
            }
        }
    
        getDashboard(role: Role, id: number) {
            return this.strategies[role].getDashboard(id);
        }

        getByPhone(role: Role, phone: string) {
            return this.strategies[role].getByPhone(phone);
        }

        getById(role: Role, phone: string) {
            return this.strategies[role].getByPhone(phone);
    }
}