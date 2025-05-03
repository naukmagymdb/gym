import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
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
import { AbonementTypeRepository } from './abon-type.repository';
import { AbonementTypeResponseDto } from './dtos/abon-type-response.dto';
import { CreateAbonTypeDto } from './dtos/create-abon-type.dto';
import { UpdateAbonTypeDto } from './dtos/update-abon-type.dto';

@Roles(Role.Admin)
@UseGuards(AuthenticatedGuard, RolesGuard)
@Controller('abonement-types')
export class AbonementTypeController {
  constructor(private readonly service: AbonementTypeRepository) {}

  @Roles(Role.Admin, Role.User)
  @Get()
  findAll(
    @Query(
      'sortBy',
      new DefaultEnumPipe(
        AbonementTypeRepository.getColumns(),
        'abonement_type',
      ),
    )
    sortBy?: string,
    @Query('order', new DefaultEnumPipe(['asc', 'desc'], 'asc'))
    order?: string,
  ): Promise<AbonementTypeResponseDto[]> {
    return this.service.findAll({ sortBy, order });
  }

  @Get(':abonement_type')
  findOne(
    @Param('abonement_type') abonement_type: string,
  ): Promise<AbonementTypeResponseDto> {
    return this.service.findOne({ abonement_type });
  }

  @Post()
  create(@Body() dto: CreateAbonTypeDto): Promise<AbonementTypeResponseDto> {
    return this.service.create(dto);
  }

  @Put(':abonement_type')
  update(
    @Param('abonement_type') abonement_type: string,
    @Body() dto: UpdateAbonTypeDto,
  ): Promise<AbonementTypeResponseDto> {
    return this.service.update(abonement_type, dto);
  }

  @Delete(':abonement_type')
  delete(
    @Param('abonement_type') abonement_type: string,
  ): Promise<AbonementTypeResponseDto> {
    return this.service.delete(abonement_type);
  }
}
