import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch, // Import ParseIntPipe
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { AuthenticatedGuard } from 'src/auth/guards/Authenticated.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/auth/utils/role.enum';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { SuppliersService } from './suppliers.repository';

@Roles(Role.Admin)
@UseGuards(AuthenticatedGuard, RolesGuard)
@Controller('suppliers')
export class SuppliersController {
  constructor(private readonly suppliersService: SuppliersService) {}

  @Post()
  create(@Body() supplierDto: CreateSupplierDto) {
    return this.suppliersService.create(supplierDto);
  }

  @Get()
  findAll(
    @Query('filter') filter?: string,
    @Query('sortBy') sortBy: string = 'edrpou',
    @Query('order') order: 'asc' | 'desc' = 'asc',
  ) {
    if (filter)
      return this.suppliersService.getSuppliersOnlySupplySpecifiedProduct(
        filter,
      );
    return this.suppliersService.findAll(sortBy, order);
  }

  @Get(':edrpou')
  findOne(@Param('edrpou', ParseIntPipe) edrpou: number) {
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

  @Get('')
  getSuppliersOnlySuppySpecifiedProduct(@Query('filter') filter: string) {
    return this.suppliersService.getSuppliersOnlySupplySpecifiedProduct(filter);
  }

  @Patch(':id')
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
