import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { AuthenticatedGuard } from 'src/auth/guards/Authenticated.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/auth/utils/role.enum';
import { DefaultEnumPipe } from 'src/common/pipes/default-enum.pipe';
import { CreateDepartmentDto } from './dtos/create-department.dto';
import { DepartmentResponseDto } from './dtos/department-response.dto';
import { UpdateDepartmentDto } from './dtos/update-department.dto';
import { DepartmentRepository } from './repositories/department.repository';

@Roles(Role.Admin)
@UseGuards(AuthenticatedGuard, RolesGuard)
@Controller('departments')
export class DepartmentController {
  constructor(private readonly depRepository: DepartmentRepository) {}

  @Get()
  findAll(
    @Query(
      'sortBy',
      new DefaultEnumPipe(['department_id', 'address'], 'department_id'),
    )
    sortBy?: string,
    @Query('order', new DefaultEnumPipe(['asc', 'desc'], 'asc'))
    order?: string,
  ) {
    return this.depRepository.findAll({ sortBy, order });
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) department_id: number) {
    return this.depRepository.findOne({ department_id });
  }

  @Post()
  create(@Body() dto: CreateDepartmentDto): Promise<DepartmentResponseDto> {
    return this.depRepository.create(dto);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateDepartmentDto,
  ): Promise<DepartmentResponseDto> {
    return this.depRepository.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.depRepository.delete(id);
  }

  @Get(':id/managers_info')
  getManagersInfo(
    @Param('id', ParseIntPipe) department_id: number,
    @Query(
      'sortBy',
      new DefaultEnumPipe(['department_id', 'address'], 'department_id'),
    )
    sortBy?: string,
    @Query('order', new DefaultEnumPipe(['asc', 'desc'], 'asc'))
    order?: string,
  ) {
    return this.depRepository.getManagersInfo(department_id, { sortBy, order });
  }
}
