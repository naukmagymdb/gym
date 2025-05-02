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
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { AuthenticatedGuard } from 'src/auth/guards/Authenticated.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/auth/utils/role.enum';
import { DefaultEnumPipe } from 'src/common/pipes/default-enum.pipe';
import { OptionalParseIntPipe } from 'src/common/pipes/optional-parse-int.pipe';
import { ParseDateStringPipe } from 'src/common/pipes/parse-date-string.pipe';
import { TrainingResponseDto } from '../trainings/dtos/training-response.dto';
import { TrainingRepository } from '../trainings/training.repository';
import { CreateStaffDto } from './dtos/create-staff.dto';
import { StaffResponseDto } from './dtos/staff-response.dto';
import { UpdateStaffDto } from './dtos/update-staff.dto';
import { StaffRepository } from './staff.repository';

@Roles(Role.Admin)
@UseGuards(AuthenticatedGuard, RolesGuard)
@Controller('staff')
export class StaffController {
  constructor(
    private readonly staffRepository: StaffRepository,
    private readonly trainingRepository: TrainingRepository,
  ) {}

  @Get()
  async findAll(
    @Query('depId', OptionalParseIntPipe) depId?: number,
    @Query('sortBy', new DefaultEnumPipe(TrainingRepository.getColumns(), 'id'))
    sortBy?: string,
    @Query('order', new DefaultEnumPipe(['asc', 'desc'], 'asc')) order?: string,
  ): Promise<StaffResponseDto[]> {
    return this.staffRepository.findAll({
      depId,
      sortBy,
      order,
    });
  }

  @Get(':id')
  async findById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<StaffResponseDto> {
    return this.staffRepository.findOne({ id });
  }

  @Post()
  async create(
    @Body() createStaffDto: CreateStaffDto,
  ): Promise<StaffResponseDto> {
    return this.staffRepository.create(createStaffDto);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStaffDto: UpdateStaffDto,
  ): Promise<StaffResponseDto> {
    return this.staffRepository.update(id, updateStaffDto);
  }

  @Delete(':id')
  async delete(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<StaffResponseDto> {
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
