import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminsService } from 'src/admins/services/admins/admins.service';
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

    getDashboard(role: string, id) {
        if (role === 'admin') {
            return this.adminsService.getAdminDashboard(id);
        } else {
            return this.usersService.getUserDashboard(id);
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
