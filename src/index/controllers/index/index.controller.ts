import { ClassSerializerInterceptor, Controller, Get, Request, UseGuards, UseInterceptors } from '@nestjs/common';
import { Authenticated } from 'src/auth/utils/Authenticated';
import { Department } from 'src/database/entities/department.entity';
import { IndexService } from 'src/index/services/index/index.service';


@Controller()
export class IndexController {
    constructor(
        private readonly indexService: IndexService
    ) { }

    @Get()
    async getDashboard(@Request() req) {
        const { role, id } = req.logged;
        return await this.indexService.getDashboard(role, id);
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get('test')
    async testFunc() {
        return await this.indexService.testFunc();
    }
}
