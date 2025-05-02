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
import { OptionalParseBoolPipe } from 'src/common/pipes/optional-parse-bool.pipe';
import { AbonementRepository } from '../abonements/abonement.repository';
import { AbonementResponseDto } from '../abonements/dtos/abonement-response.dto';
import { CreateAbonementDto } from '../abonements/dtos/create-abonement.dto';
import { UpdateAbonementDto } from '../abonements/dtos/update-abonement.dto';
import { TrainingResponseDto } from '../trainings/dtos/training-response.dto';
import { TrainingRepository } from '../trainings/training.repository';
import { CreateVisitorDto } from './dtos/create-visitor.dto';
import { UpdateVisitorDto } from './dtos/update-visitor.dto';
import {
  VisitorFullResponseDto,
  VisitorResponseDto,
} from './dtos/visitor-response.dto';
import { VisitorRepository } from './visitor.repository';

@Roles(Role.Admin)
@UseGuards(AuthenticatedGuard, RolesGuard)
@Controller('visitors')
export class VisitorController {
  constructor(
    private readonly visitorRepository: VisitorRepository,
    private readonly trainingRepository: TrainingRepository,
    private readonly abonementRepository: AbonementRepository,
  ) {}

  @Get()
  async findAll(
    @Query('abon_type') abonement_type?: string,
    @Query(
      'is_active',
      OptionalParseBoolPipe,
      new DefaultEnumPipe<boolean>([true, false], true),
    )
    is_active?: string,
    @Query(
      'sortBy',
      new DefaultEnumPipe<string>(
        [...VisitorRepository.getColumns(), 'age'],
        'id',
      ),
    )
    sortBy?: string,
    @Query('order', new DefaultEnumPipe<string>(['asc', 'desc'], 'asc'))
    order?: string,
  ): Promise<VisitorFullResponseDto[]> {
    return await this.visitorRepository.findAll({
      queries: {
        abonement_type,
        is_active,
      },
      sortOptions: {
        sortBy,
        order,
      },
    });
  }

  @Get(':id')
  async findById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<VisitorFullResponseDto> {
    return await this.visitorRepository.findOne({ id });
  }

  @Post()
  async create(
    @Body() createVisitorDto: CreateVisitorDto,
  ): Promise<VisitorResponseDto> {
    return await this.visitorRepository.create(createVisitorDto);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateVisitorDto: UpdateVisitorDto,
  ): Promise<VisitorResponseDto> {
    return await this.visitorRepository.update(id, updateVisitorDto);
  }

  @Delete(':id')
  async delete(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<VisitorResponseDto> {
    return await this.visitorRepository.delete(id);
  }

  @Get(':id/trainings')
  getTrainingHistory(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<TrainingResponseDto[]> {
    return this.trainingRepository.findByVisitorId(id);
  }

  @Get(':id/abonement')
  viewAbonement(
    @Param('id', ParseIntPipe) visitor_id: number,
  ): Promise<AbonementResponseDto> {
    return this.abonementRepository.findOne({ visitor_id, is_active: true });
  }

  @Patch(':id/abonement')
  updateAbonement(
    @Param('id', ParseIntPipe) abonement_id: number,
    @Body() dto: UpdateAbonementDto,
  ): Promise<AbonementResponseDto> {
    return this.abonementRepository.update(abonement_id, dto);
  }

  @Post(':id/abonement')
  createAbonement(
    @Param('id', ParseIntPipe) visitor_id: number,
    @Body() dto: CreateAbonementDto,
  ): Promise<AbonementResponseDto> {
    return this.abonementRepository.create({ ...dto, visitor_id });
  }
}
