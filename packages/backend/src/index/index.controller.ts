import { Controller, Get, UseGuards, UseInterceptors, ClassSerializerInterceptor, Request } from "@nestjs/common";
import { AccountsHandler } from "src/accounts/accountsHandler.service";
import { Roles } from "src/auth/decorators/roles.decorator";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { Role } from "src/auth/utils/role.enum";
import { IndexService } from "src/index/index.service";


@Controller()
export class IndexController {
    constructor(
        private readonly indexService: IndexService,
        private readonly accountsHandler: AccountsHandler
    ) { }

    @Get()
    async getDashboard(@Request() req) {
        const { role, phone_num } = req.logged;
        return this.accountsHandler.getDashboard(role, phone_num)
    }

    @Roles(Role.Admin)
    @UseGuards(RolesGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    @Get('test')
    async testFunc() { 
        return await this.indexService.testFunc();
    }
}
