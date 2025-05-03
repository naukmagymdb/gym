import {
  Body,
  Controller,
  Delete,
  Get,
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
import { TrainingLookupDto } from './dtos/training-lookup.dto';
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
    @Query('visitor_id', OptionalParseIntPipe) visitor_id?: number,
    @Query('staff_id', OptionalParseIntPipe) staff_id?: number,
    @Query('date_of_begin', ParseDateStringPipe) date_of_begin?: string,
    @Query('date_of_end', ParseDateStringPipe) date_of_end?: string,
    @Query(
      'sortBy',
      new DefaultEnumPipe<string>(
        TrainingRepository.getColumns(),
        'visitor_id',
      ),
    )
    sortBy?: string,
    @Query('order', new DefaultEnumPipe<string>(['asc', 'desc'], 'asc'))
    order?: string,
  ): Promise<TrainingResponseDto[]> {
    return this.trainingRepository.findAll({
      queries: {
        visitor_id: visitor_id,
        staff_id: staff_id,
        date_of_begin: date_of_begin,
        date_of_end: date_of_end,
      },
      sortOptions: {
        sortBy: sortBy,
        order: order,
      },
    });
  }

  @Get('by-id')
  findOne(@Body() body: TrainingLookupDto): Promise<TrainingResponseDto> {
    return this.trainingRepository.findOne(body);
  }

  @Post()
  create(@Body() dto: CreateTrainingDto): Promise<TrainingResponseDto> {
    return this.trainingRepository.create(dto);
  }

  @Patch()
  update(
    @Body() body: { lookup: TrainingLookupDto; update: UpdateTrainingDto },
  ): Promise<TrainingResponseDto> {
    return this.trainingRepository.update(body.lookup, body.update);
  }

  @Delete()
  delete(@Body() body: TrainingLookupDto): Promise<TrainingResponseDto> {
    return this.trainingRepository.delete(body);
  }
}

//гварди?
