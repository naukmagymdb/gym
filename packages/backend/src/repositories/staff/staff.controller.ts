import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ParseDateStringPipe } from 'src/common/pipes/parse-date-string.pipe';
import { TrainingResponseDto } from '../trainings/dtos/training-response.dto';
import { TrainingRepository } from '../trainings/training.repository';
import { CreateStaffDto } from './dtos/create-staff.dto';
import { UpdateStaffDto } from './dtos/update-staff.dto';
import { StaffRepository } from './staff.repository';

// @Roles(Role.Admin)
// @UseGuards(AuthenticatedGuard, RolesGuard)
@Controller('staff')
export class StaffController {
  constructor(
    private readonly staffRepository: StaffRepository,
    private readonly trainingRepository: TrainingRepository,
  ) {}

  @Get()
  async findAll(
    @Query('depId') depId: number | null = null,
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
  async findById(@Param('id', ParseIntPipe) id: number) {
    return this.staffRepository.findOne({ id });
  }

  @Post()
  async create(@Body() createStaffDto: CreateStaffDto) {
    return this.staffRepository.create(createStaffDto);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStaffDto: UpdateStaffDto,
  ) {
    return this.staffRepository.update(id, updateStaffDto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.staffRepository.delete(id);
  }

  @Get(':id/trainings')
  async getStaffSessions(
    @Param('id', ParseIntPipe) staff_id: number,
    @Query('date_of_begin', new ParseDateStringPipe()) date_of_begin?: string,
    @Query('date_of_end', new ParseDateStringPipe()) date_of_end?: string,
  ): Promise<TrainingResponseDto[]> {
    return this.trainingRepository.findAll({
      queries: {
        staff_id: staff_id,
        date_of_begin: date_of_begin,
        date_of_end: date_of_end,
      },
      sortOptions: {
        sortBy: 'visitor_id',
        order: 'asc',
      },
    });
  }
}
