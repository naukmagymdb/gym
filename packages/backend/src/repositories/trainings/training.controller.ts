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
import { CreateReadTrainingDto } from './dtos/create-read-training.dto';
import { UpdateTrainingDto } from './dtos/update-training.dto';
import { TrainingRepository } from './training.repository';

@Roles(Role.Admin)
@UseGuards(AuthenticatedGuard, RolesGuard)
@Controller('trainings')
export class TrainingController {
  constructor(private readonly trainingRepository: TrainingRepository) {}

  @Get()
  findAll(
    @Query('visitorId') visitorId: number | null,
    @Query('staffId') staffId: number | null,
    @Query('dateFrom') dateFrom: string | null,
    @Query('dateTo') dateTo: string | null,
    @Query('sortBy') sortBy: string = 'Date_Of_Begin',
    @Query('order') order: 'asc' | 'desc' = 'asc',
  ) {
    return this.trainingRepository.findAll({
      visitorId: visitorId,
      staffId: staffId,
      dateFrom: dateFrom,
      dateTo: dateTo,
      sortBy: sortBy,
      order: order,
    });
  }

  @Get('by-id')
  findOne(@Body() body: CreateReadTrainingDto) {
    return this.trainingRepository.findOne(body);
  }

  @Post()
  create(@Body() dto: CreateReadTrainingDto) {
    return this.trainingRepository.create(dto);
  }

  @Patch()
  update(
    @Body() body: { lookup: CreateReadTrainingDto; update: UpdateTrainingDto },
  ) {
    return this.trainingRepository.update(body.lookup, body.update);
  }

  @Delete()
  delete(@Body() body: CreateReadTrainingDto) {
    return this.trainingRepository.delete(body);
  }
}
