import { Controller, Get, Request } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from 'src/database/entities/department.entity';
import { Staff } from 'src/database/entities/staff.entity';
import { Visitor } from 'src/database/entities/visitor.entity';
import { IndexService } from 'src/index/services/index/index.service';
import { Repository } from 'typeorm';


@Controller()
export class IndexController {
    constructor(
        private readonly indexService: IndexService,
        @InjectRepository(Visitor) private visitorRepository: Repository<Visitor>,
        @InjectRepository(Staff) private staffRepository: Repository<Staff>,
        @InjectRepository(Department) private departmentRepository: Repository<Department>
    ) { }

    @Get()
    async getDashboard(@Request() req) {
        const { role, id } = req.logged;
        return await this.indexService.getDashboard(role, id);
    }

    @Get('test')
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
