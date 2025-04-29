import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { SuppliersService } from './suppliers.repository';

@Controller('suppliers')
export class SuppliersController {
  constructor(private readonly suppiersService: SuppliersService) {}

  @Post()
  create(@Body() suppierDto: CreateSupplierDto) {
    return this.suppiersService.create(suppierDto);
  }

  @Get()
  findAll(
    @Query('sortBy') sortBy: string = 'edrpou',
    @Query('order') order: 'asc' | 'desc' = 'asc',
  ) {
    return this.suppiersService.findAll(sortBy, order);
  }

  @Get(':id')
  findOne(@Param('id') edrpou: string) {
    return this.suppiersService.findOne(+edrpou);
  }

  @Get(':id/products')
  getProductsBySupplier(
    @Param('id') edrpou: string,
    @Query('sortBy') sortBy: string = 'goods_id',
    @Query('order') order: 'asc' | 'desc' = 'asc',
  ) {
    return this.suppiersService.getProductsBySupplier(+edrpou, sortBy, order);
  }

  @Patch(':id')
  update(
    @Param('id') edrpou: string,
    @Body() updateSuppierDto: UpdateSupplierDto,
  ) {
    return this.suppiersService.update(+edrpou, updateSuppierDto);
  }

  @Delete(':id')
  remove(@Param('id') edrpou: string) {
    return this.suppiersService.remove(+edrpou);
  }
}
