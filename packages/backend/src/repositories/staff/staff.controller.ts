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
import { plainToInstance } from 'class-transformer';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { AuthenticatedGuard } from 'src/auth/guards/Authenticated.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/auth/utils/role.enum';
import { DefaultEnumPipe } from 'src/common/pipes/default-enum.pipe';
import { OptionalParseIntPipe } from 'src/common/pipes/optional-parse-int.pipe';
import { ContractsService } from '../contracts/contracts.repository';
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
    @Query('sortBy') sortBy: string = 'surname',
    @Query('order', new DefaultEnumPipe(['asc', 'desc'], 'asc')) order?: string,
  ): Promise<StaffResponseDto[]> {
    const staff = await this.staffRepository.findAll({
      depId,
      sortBy,
      order,
    });

    return plainToInstance(StaffResponseDto, staff);
  }

  @Get('self_dep_managers')
  getSelfDepartmentManagers() {
    return this.staffRepository.getSelfDepartmentManagers();
  }

  @Get(':id')
  async findById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<StaffResponseDto> {
    const staff = await this.staffRepository.findOne({ id });
    return plainToInstance(StaffResponseDto, staff);
  }

  @Get(':id/contracts')
  async findSignedContracts(
    @Param('id', ParseIntPipe) id: number,
    @Query(
      'sortBy',
      new DefaultEnumPipe(ContractsService.getColumns(), 'contract_date'),
    )
    sortBy?: string,
    @Query('order', new DefaultEnumPipe(['asc', 'desc'], 'asc')) order?: string,
  ) {
    return this.staffRepository.findSignedContracts(id, sortBy, order);
  }

  @Post()
  create(@Body() createStaffDto: CreateStaffDto): Promise<StaffResponseDto> {
    return this.staffRepository.create(createStaffDto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStaffDto: UpdateStaffDto,
  ): Promise<StaffResponseDto> {
    return this.staffRepository.update(id, updateStaffDto);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<StaffResponseDto> {
    return this.staffRepository.delete(id);
  }

  @Get(':staff_id/trainings')
  getStaffSessions(
    @Param('staff_id', ParseIntPipe) staff_id: number,
    @Query('visitor_id', OptionalParseIntPipe) visitor_id?: number,
    @Query(
      'sortBy',
      new DefaultEnumPipe(TrainingRepository.getColumns(), 'visitor_id'),
    )
    sortBy?: string,
    @Query('order', new DefaultEnumPipe(['asc', 'desc'], 'asc')) order?: string,
  ): Promise<TrainingResponseDto[]> {
    return this.staffRepository.findAllSessions(staff_id, {
      visitor_id,
      sortBy,
      order,
    });
  }
}
