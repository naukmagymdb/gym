import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { AuthenticatedGuard } from 'src/auth/guards/Authenticated.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/auth/utils/role.enum';
import { CreateStaffDto } from './dtos/create-staff.dto';
import { UpdateStaffDto } from './dtos/update-staff.dto';
import { StaffRepository } from './staff.repository';

@Roles(Role.Admin)
@UseGuards(AuthenticatedGuard, RolesGuard)
@Controller('staff')
export class StaffController {
  constructor(private readonly staffRepository: StaffRepository) {}

  @Get()
  async findAll(
    @Query('depId') depId: number,
    @Query('sortBy') sortBy: string = 'surname',
    @Query('order') order: 'asc' | 'desc' = 'asc',
  ) {
    return this.staffRepository.findAll({
      depId: depId,
      sortBy: sortBy,
      order: order,
    });
  }

  @Get(':id')
  async findById(@Param('id') id: number) {
    return this.staffRepository.findById(id);
  }

  @Post()
  async create(@Body() createStaffDto: CreateStaffDto) {
    return this.staffRepository.create(createStaffDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateStaffDto: UpdateStaffDto,
  ) {
    return this.staffRepository.update(id, updateStaffDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.staffRepository.delete(id);
  }
}
