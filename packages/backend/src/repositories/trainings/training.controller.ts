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
import { DefaultEnumPipe } from 'src/common/pipes/default-enum.pipe';
import { OptionalParseIntPipe } from 'src/common/pipes/optional-parse-int.pipe';
import { ParseDateStringPipe } from 'src/common/pipes/parse-date-string.pipe';
import { CreateTrainingDto } from './dtos/create-training.dto';
import { TrainingResponseDto } from './dtos/training-response.dto';
import { UpdateTrainingDto } from './dtos/update-training.dto';
import { TrainingRepository } from './training.repository';

@Roles(Role.Admin)
@UseGuards(AuthenticatedGuard, RolesGuard)
@Controller('trainings')
export class TrainingController {
  constructor(private readonly trainingRepository: TrainingRepository) {}

  @Get()
  findAll(
    @Query('id', OptionalParseIntPipe) id?: number,
    @Query('visitor_id', OptionalParseIntPipe) visitor_id?: number,
    @Query('staff_id', OptionalParseIntPipe) staff_id?: number,
    @Query('date_of_begin', ParseDateStringPipe) date_of_begin?: string,
    @Query('date_of_end', ParseDateStringPipe) date_of_end?: string,
    @Query(
      'sortBy',
      new DefaultEnumPipe<string>(TrainingRepository.getColumns(), 'id'),
    )
    sortBy?: string,
    @Query('order', new DefaultEnumPipe<string>(['asc', 'desc'], 'asc'))
    order?: string,
  ): Promise<TrainingResponseDto[]> {
    return this.trainingRepository.findAll({
      queries: {
        id,
        visitor_id,
        staff_id,
        date_of_begin,
        date_of_end,
      },
      sortOptions: {
        sortBy,
        order,
      },
    });
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<TrainingResponseDto> {
    return this.trainingRepository.findOne({ id });
  }

  @Post()
  create(@Body() dto: CreateTrainingDto): Promise<TrainingResponseDto> {
    return this.trainingRepository.create(dto);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() dto: UpdateTrainingDto,
  ): Promise<TrainingResponseDto> {
    return this.trainingRepository.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<TrainingResponseDto> {
    return this.trainingRepository.delete(id);
  }
}
