import {
  Body,
  Controller,
  Get,
  Patch,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthenticatedGuard } from 'src/auth/guards/Authenticated.guard';
import { UpdateStaffDto } from 'src/repositories/staff/dtos/update-staff.dto';
import { UpdateVisitorDto } from 'src/repositories/visitors/dtos/update-visitor.dto';
import { IndexHandler } from './index.handler';

@UseGuards(AuthenticatedGuard)
@Controller('dashboard')
export class IndexController {
  constructor(private readonly indexHandler: IndexHandler) {}

  @Get('')
  async getDashboard(@Request() req) {
    return this.indexHandler.deserialize(req.user.role, req.user);
  }

  @Patch('')
  async updateAccountInfo(
    @Request() req,
    @Body() updateDto: UpdateStaffDto | UpdateVisitorDto,
  ) {
    const { role, id } = req.user;
    const patched = await this.indexHandler.updateAccountInfo(
      role,
      id,
      updateDto,
    );
    return this.indexHandler.deserialize(role, patched);
  }
}
