import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminsService } from 'src/admins/services/admins/admins.service';
import { Role } from 'src/auth/utils/role.enum';
import { Department } from 'src/database/entities/department.entity';
import { Staff } from 'src/database/entities/staff.entity';
import { Visitor } from 'src/database/entities/visitor.entity';
import { UsersService } from 'src/users/services/users/users.service';
import { Repository } from 'typeorm';

@Injectable()
export class IndexService {
    constructor(
        private readonly adminsService: AdminsService,
        private readonly usersService: UsersService,
        @InjectRepository(Visitor) private visitorRepository: Repository<Visitor>,
        @InjectRepository(Staff) private staffRepository: Repository<Staff>,
        @InjectRepository(Department) private departmentRepository: Repository<Department>
    ) { }

    getDashboard(role: Role, phone: string) {
        if (role === 'user') {
            return this.usersService.getUserDashboard(phone);
        } else {
            return this.adminsService.getAdminDashboard(phone, role);
        }
    }

    async testFunc() {
        const visitors = await this.visitorRepository.find();
        const departments = await this.departmentRepository.find();
        const staff = await this.staffRepository.find();

        return {
            visitors: visitors,
            departments: departments,
            staff: staff
        }
    }
}
