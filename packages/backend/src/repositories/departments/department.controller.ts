import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query
} from '@nestjs/common';
import { DepartmentRepository } from './department.repository';
import { DepartmentDto } from './dtos/department.dto';


// @Roles(Role.Admin)
// @UseGuards(AuthenticatedGuard, RolesGuard)
@Controller('department')
export class DepartmentController {
  constructor(private readonly depRepository: DepartmentRepository) { }

  @Get()
  getAll(
    @Query('sortBy') sortBy: 'department_id' | 'address' = 'department_id',
    @Query('order') order: 'asc' | 'desc' = 'asc',
  ) {
    return this.depRepository.findAll({ sortBy, order });
  }

  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.depRepository.findById(id);
  }

  @Post()
  create(@Body() dto: DepartmentDto) {
    return this.depRepository.create(dto);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: DepartmentDto) {
    return this.depRepository.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.depRepository.delete(id);
  }
}
