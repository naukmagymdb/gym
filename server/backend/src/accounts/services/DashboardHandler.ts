import { Injectable } from "@nestjs/common";
import { Role } from "src/auth/utils/role.enum";
import { DashboardStrategy } from "src/common/interfaces/DashboardStrategy.interface";
import { AdminsService } from "../admins/admins.service";
import { UsersService } from "../users/users.service";

@Injectable()
export class DashboardHandler {
    private dashboardStrategies: Record<Role, DashboardStrategy>
    
        constructor(
            private readonly adminsService: AdminsService,
            private readonly usersService: UsersService
        ) { 
            this.dashboardStrategies = {
                [Role.User]: usersService,
                [Role.Admin]: adminsService
            }
        }
    
        getDashboard(role: Role, phone: string) {
            return this.dashboardStrategies[role].getDashboard(phone);
        }
}