import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Role } from 'src/auth/utils/role.enum';
import { StaffResponseDto } from 'src/repositories/staff/dtos/staff-response.dto';
import { UpdateStaffDto } from 'src/repositories/staff/dtos/update-staff.dto';
import { StaffRepository } from 'src/repositories/staff/staff.repository';
import { UpdateVisitorDto } from 'src/repositories/visitors/dtos/update-visitor.dto';
import { VisitorResponseDto } from 'src/repositories/visitors/dtos/visitor-response.dto';
import { VisitorRepository } from 'src/repositories/visitors/visitor.repository';

@Injectable()
export class IndexHandler {
  private repoStrategies: Record<Role, any>;
  private responseDtoStrategies: Record<Role, any>;

  constructor(
    private readonly staffRepository: StaffRepository,
    private readonly visitorsRepository: VisitorRepository,
  ) {
    this.repoStrategies = {
      [Role.User]: visitorsRepository,
      [Role.Admin]: staffRepository,
    };
    this.responseDtoStrategies = {
      [Role.User]: VisitorResponseDto,
      [Role.Admin]: StaffResponseDto,
    };
  }

  updateAccountInfo(
    role: Role,
    id: number,
    updateDto: UpdateStaffDto | UpdateVisitorDto,
  ) {
    return this.repoStrategies[role].update(id, updateDto);
  }

  getByPhone(role: Role, phone_num: string) {
    return this.repoStrategies[role].findOne({ phone_num });
  }

  getById(role: Role, id: string) {
    return this.repoStrategies[role].findOne({ id });
  }

  deserialize(role: Role, data: any) {
    const dto = this.responseDtoStrategies[role];
    return plainToInstance(dto, data);
  }
}
