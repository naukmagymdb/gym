import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Role } from 'src/auth/utils/role.enum';
import { AccountStrategy } from 'src/common/strategies/account.strategy';
import { CreateStaffDto } from 'src/repositories/staff/dtos/create-staff.dto';
import { UpdateStaffDto } from 'src/repositories/staff/dtos/update-staff.dto';
import { CreateVisitorDto } from 'src/repositories/visitors/dtos/create-visitor.dto';
import { UpdateVisitorDto } from 'src/repositories/visitors/dtos/update-visitor.dto';
import { AdminsService } from '../admins/admins.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class AccountsHandler {
  private strategies: Record<Role, AccountStrategy>;
  private dtoStrategies: Record<Role, any>;

  constructor(
    private readonly adminsService: AdminsService,
    private readonly usersService: UsersService,
  ) {
    this.strategies = {
      [Role.User]: usersService,
      [Role.Admin]: adminsService,
    };
    this.dtoStrategies = {
      [Role.User]: CreateVisitorDto,
      [Role.Admin]: CreateStaffDto,
    };
  }

  getDashboard(role: Role, id: number) {
    return this.strategies[role].getDashboard(id);
  }

  updateAccountInfo(
    role: Role,
    id: number,
    updateDto: UpdateStaffDto | UpdateVisitorDto,
  ) {
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
