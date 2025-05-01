import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { AuthenticatedGuard } from 'src/auth/guards/Authenticated.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/auth/utils/role.enum';
import { ProductDto } from './dto/product.dto';
import { ProductsService } from './products.repository';

@Roles(Role.Admin)
@UseGuards(AuthenticatedGuard, RolesGuard)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: ProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll(
    @Query('sortBy') sortBy: 'goods_id' | 'goods_name' = 'goods_id',
    @Query('order') order: 'asc' | 'desc' = 'asc',
  ) {
    return this.productsService.findAll({
      sortBy: sortBy,
      order: order,
    });
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findOne({ id });
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: ProductDto,
  ) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.delete(id);
  }
}
