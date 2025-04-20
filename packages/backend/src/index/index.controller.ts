import { Controller, Get, UseGuards, UseInterceptors, ClassSerializerInterceptor, Request, Param, ParseIntPipe, UsePipes } from "@nestjs/common";
import { AccountsHandler } from "src/accounts/accountsHandler.service";
import { Roles } from "src/auth/decorators/roles.decorator";
import { AuthenticatedGuard } from "src/auth/guards/Authenticated.guard";
import { RolesGuard } from "src/auth/guards/Roles.guard";
import { SelfGuard } from "src/auth/guards/Self.guard";
import { Role } from "src/auth/utils/role.enum";
import { IndexService } from "src/index/index.service";


@Controller()
export class IndexController {
    constructor(
        private readonly indexService: IndexService,
        private readonly accountsHandler: AccountsHandler
    ) { }

    @Get(':id')
    @UseGuards(AuthenticatedGuard, SelfGuard)
    @UsePipes(ParseIntPipe)
    getDashboard(
        @Request() req,
        @Param('id', ParseIntPipe) id: number
    ) {
        const { role } = req.user;
        return this.accountsHandler.getDashboard(role, id)
    }

    @Roles(Role.Admin)
    @UseGuards(AuthenticatedGuard, RolesGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    @Get('test/test')
    testFunc() {
        return this.indexService.testFunc();
    }
}
