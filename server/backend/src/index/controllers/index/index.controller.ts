import { Controller, Get, UseGuards, UseInterceptors, ClassSerializerInterceptor, Request } from "@nestjs/common";
import { Roles } from "src/auth/decorators/roles.decorator";
import { Role } from "src/auth/utils/role.enum";
import { RolesGuard } from "src/auth/utils/roles.guard";
import { IndexService } from "src/index/services/index/index.service";


@Controller()
export class IndexController {
    constructor(
        private readonly indexService: IndexService
    ) { }

    @Get()
    async getDashboard(@Request() req) {
        const { role, phone_num } = req.logged;
        return await this.indexService.getDashboard(role, phone_num);
    }

    @Roles(Role.Admin)
    @UseGuards(RolesGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    @Get('test')
    async testFunc() { 
        return await this.indexService.testFunc();
    }
}
