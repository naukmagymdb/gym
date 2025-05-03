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
import { ParseDateStringPipe } from 'src/common/pipes/parse-date-string.pipe';
import { AbonementRepository } from './abonement.repository';
import { AbonementResponseDto } from './dtos/abonement-response.dto';
import { CreateAbonementDto } from './dtos/create-abonement.dto';
import { UpdateAbonementDto } from './dtos/update-abonement.dto';

@Roles(Role.Admin)
@UseGuards(AuthenticatedGuard, RolesGuard)
@Controller('abonements')
export class AbonementController {
  constructor(private readonly repo: AbonementRepository) {}

  @Get()
  findAll(
    @Query(
      'is_active',
      new OptionalParseBoolPipe(),
      new DefaultEnumPipe<boolean>([true, false], undefined),
    )
    is_active?: boolean,
    @Query('abonement_type') abonement_type?: string,
    @Query('start_date', new ParseDateStringPipe()) start_date?: number,
    @Query('end_date', new ParseDateStringPipe()) end_date?: string,
    @Query(
      'sortBy',
      new DefaultEnumPipe<string>(
        AbonementRepository.getColumns(),
        'abonement_id',
      ),
    )
    sortBy?: string,
    @Query('order', new DefaultEnumPipe<string>(['asc', 'desc'], 'asc'))
    order?: string,
  ): Promise<AbonementResponseDto[]> {
    return this.repo.findAll({
      queries: {
        is_active,
        abonement_type,
        start_date,
        end_date,
      },
      sortOptions: {
        sortBy,
        order,
      },
    });
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) abonement_id: number,
  ): Promise<AbonementResponseDto> {
    return this.repo.findOne({ abonement_id });
  }

  @Post()
  create(@Body() dto: CreateAbonementDto): Promise<AbonementResponseDto> {
    return this.repo.create(dto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) abonement_id: number,
    @Body() dto: UpdateAbonementDto,
  ): Promise<AbonementResponseDto> {
    return this.repo.update(abonement_id, dto);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<AbonementResponseDto> {
    return this.repo.delete(id);
  }
}

//гварди?
