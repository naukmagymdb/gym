import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateVisitorDto } from './dtos/create-visitor.dto';
import { UpdateVisitorDto } from './dtos/update-visitor.dto';
import { VisitorRepository } from './visitor.repository';

@Controller('visitor')
export class VisitorController {
  constructor(private readonly visitorRepository: VisitorRepository) {}

  @Get()
  async findAll(
    @Query('sortBy') sortBy: string = 'last_name',
    @Query('order') order: 'asc' | 'desc' = 'asc',
  ) {
    return await this.visitorRepository.findAll({
        sortBy: sortBy,
        order: order
    });
  }

  @Get(':id')
  async findById(@Param('id') id: number) {
    return await this.visitorRepository.findById(id);
  }

  @Post()
  async create(@Body() createVisitorDto: CreateVisitorDto) {
    return await this.visitorRepository.create(createVisitorDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateVisitorDto: UpdateVisitorDto,
  ) {
    return await this.visitorRepository.update(id, updateVisitorDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.visitorRepository.delete(id);
  }
}
