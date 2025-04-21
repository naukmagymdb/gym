import { Injectable } from "@nestjs/common";
import { Role } from "src/auth/utils/role.enum";
import { AdminsService } from "../admins/admins.service";
import { UsersService } from "../users/users.service";
import { AccountStrategy } from "src/common/strategies/account.strategy";
import { UpdateStaffDto } from "src/database/dtos/update-staff.dto";
import { UpdateVisitorDto } from "src/database/dtos/update-visitor.dto";
import { CreateVisitorDto } from "src/database/dtos/create-visitor.dto";
import { CreateStaffDto } from "src/database/dtos/create-staff.dto";
import { plainToInstance } from "class-transformer";

@Injectable()
export class AccountsHandler {
    private strategies: Record<Role, AccountStrategy>;
    private dtoStrategies: Record<Role, any>;

    constructor(
        private readonly adminsService: AdminsService,
        private readonly usersService: UsersService
    ) {
        this.strategies = {
            [Role.User]: usersService,
            [Role.Admin]: adminsService
        };
        this.dtoStrategies = {
            [Role.User]: CreateVisitorDto,
            [Role.Admin]: CreateStaffDto
        };
    }

    getDashboard(role: Role, id: number) {
        return this.strategies[role].getDashboard(id);
    }

    updateAccountInfo(role: Role, id: number, updateDto: UpdateStaffDto | UpdateVisitorDto) {
        return this.strategies[role].updateInfo(id, updateDto);
    }

    getByPhone(role: Role, phone: string) {
        return this.strategies[role].getByPhone(phone);
    }

    getById(role: Role, phone: string) {
        return this.strategies[role].getByPhone(phone);
    }

    serialize(role: Role, data: any) {
        const dto = this.dtoStrategies[role];
        return plainToInstance(dto, data);
    }
}