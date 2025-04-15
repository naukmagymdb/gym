import { Injectable } from "@nestjs/common";
import { Role } from "src/auth/utils/role.enum";
import { PhoneLookupStrategy } from "src/common/interfaces/PhoneLookupStrategy.interface";
import { AdminsService } from "../admins/admins.service";
import { UsersService } from "../users/users.service";

@Injectable()
export class PhoneLookupHandler {
    private phoneLookupStrategies: Record<Role, PhoneLookupStrategy>;

    constructor(
        private readonly adminsService: AdminsService, 
        private readonly usersService: UsersService
    ) { 
        this.phoneLookupStrategies = {
            [Role.User]: usersService,
            [Role.Admin]: adminsService
        };
    }

    async getByPhone(role: Role, phone: string) {
        return this.phoneLookupStrategies[role].getByPhone(phone);
    }
}