import { Controller, Get, UseGuards, Request, Body, UsePipes, ValidationPipe, Patch } from "@nestjs/common";
import { AccountsHandler } from "src/accounts/services/accountsHandler.service";
import { AuthenticatedGuard } from "src/auth/guards/Authenticated.guard";
import { UpdateStaffDto } from "src/database/dtos/update-staff.dto";
import { UpdateVisitorDto } from "src/database/dtos/update-visitor.dto";


@Controller('dashboard')
export class IndexController {
    constructor(
        private readonly accountsHandler: AccountsHandler
    ) { }

    @Get('')
    @UseGuards(AuthenticatedGuard)
    async getDashboard(@Request() req) {
        const { role, id } = req.user;
        const dashboard = await this.accountsHandler.getDashboard(role, id);
        return this.accountsHandler.serialize(role, dashboard);
    }

    @Patch('')
    @UseGuards(AuthenticatedGuard)
    async updateAccountInfo(
        @Request() req,
        @Body() updateDto: UpdateStaffDto | UpdateVisitorDto
    ) {
        const { role, id } = req.user;
        const patched = await this.accountsHandler.updateAccountInfo(role, id, updateDto);
        return this.accountsHandler.serialize(role, patched);
    }
}
