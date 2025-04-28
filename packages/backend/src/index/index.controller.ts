import { Body, Controller, Get, Patch, Request, UseGuards } from '@nestjs/common';
import { AccountsHandler } from 'src/accounts/services/accountsHandler.service';
import { AuthenticatedGuard } from 'src/auth/guards/Authenticated.guard';
import { UpdateStaffDto } from 'src/repositories/staff/dtos/update-staff.dto';
import { UpdateVisitorDto } from 'src/repositories/visitors/dtos/update-visitor.dto';

@UseGuards(AuthenticatedGuard)
@Controller('dashboard')
export class IndexController {
  constructor(private readonly accountsHandler: AccountsHandler) { }

  @Get('')
  async getDashboard(@Request() req) {
    const { role, id } = req.user;
    const dashboard = await this.accountsHandler.getDashboard(role, id);
    return this.accountsHandler.deserialize(role, dashboard);
  }

  @Patch('')
  async updateAccountInfo(
    @Request() req,
    @Body() updateDto: UpdateStaffDto | UpdateVisitorDto,
  ) {
    const { role, id } = req.user;
    const patched = await this.accountsHandler.updateAccountInfo(
      role,
      id,
      updateDto,
    );
    return this.accountsHandler.deserialize(role, patched);
  }
}
