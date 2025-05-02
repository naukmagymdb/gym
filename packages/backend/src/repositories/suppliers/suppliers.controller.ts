import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe, // Import ParseIntPipe
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { SuppliersService } from './suppliers.repository';

@Controller('suppliers')
export class SuppliersController {
  constructor(private readonly suppliersService: SuppliersService) {}

  @Post()
  create(@Body() supplierDto: CreateSupplierDto) {
    return this.suppliersService.create(supplierDto);
  }

  @Get()
  findAll(
    @Query('sortBy') sortBy: string = 'edrpou',
    @Query('order') order: 'asc' | 'desc' = 'asc',
  ) {
    return this.suppliersService.findAll(sortBy, order);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) edrpou: number) {
    return this.suppliersService.findOne({ edrpou });
  }

  @Get(':id/products')
  getProductsBySupplier(
    @Param('id', ParseIntPipe) edrpou: number,
    @Query('sortBy') sortBy: string = 'goods_id',
    @Query('order') order: 'asc' | 'desc' = 'asc',
  ) {
    return this.suppliersService.getProductsBySupplier(edrpou, sortBy, order);
  }

  @Get('supplyOnly/:goods_name')
  getSuppliersOnlySuppySpecifiedProduct(
    @Param('goods_name') goods_name: string,
  ) {
    return this.suppliersService.getSuppliersOnlySupplySpecifiedProduct(
      goods_name,
    );
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) edrpou: number,
    @Body() updateSupplierDto: UpdateSupplierDto,
  ) {
    return this.suppliersService.update(edrpou, updateSupplierDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) edrpou: number) {
    return this.suppliersService.delete(edrpou);
  }
}
