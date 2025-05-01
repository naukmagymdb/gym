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
} from '@nestjs/common';
import { ContractsService } from './contracts.repository';
import { CreateContractDto } from './dto/create-contract.dto';
import { ProductInContractDTO } from './dto/product-in-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';

@Controller('contracts')
export class ContractsController {
  constructor(private readonly contractsService: ContractsService) {}

  // GET /contracts
  // Query params: sortBy=supplier|amount
  @Get()
  findAll(
    @Query('sortBy') sortBy?: 'supplier' | 'amount',
    @Query('order') order: 'asc' | 'desc' = 'asc',
  ) {
    return this.contractsService.findAll(sortBy, order);
  }

  // GET /contracts/:id
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.contractsService.findOne(id);
  }

  // GET /contracts/:id/items
  // Query params: sortBy=totalCost
  @Get(':id/items')
  findContractItems(
    @Param('id', ParseIntPipe) id: number,
    @Query('sortBy') sortBy?: 'totalCost',
    @Query('order') order: 'asc' | 'desc' = 'asc',
  ) {
    return this.contractsService.findContractItems(id, sortBy, order);
  }

  // POST /contracts
  @Post()
  create(@Body() createContractDto: CreateContractDto) {
    return this.contractsService.create(createContractDto);
  }

  // add new suppliers to contract
  // POST /contracts/:id/suppliers
  @Post(':id/suppliers')
  createContractSupplierDependencies(
    @Param('id', ParseIntPipe) id: number,
    @Body('supplierIds') supplierIds: number[],
  ) {
    return this.contractsService.createContractSupplierDependencies(
      id,
      supplierIds,
    );
  }

  @Post(':id/products')
  addProductsToContract(
    @Param('id', ParseIntPipe) id: number,
    @Body() products: ProductInContractDTO[],
  ) {
    return this.contractsService.addProductsToContract(id, products);
  }

  // PUT /contracts/:id
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateContractDto: UpdateContractDto,
  ) {
    return this.contractsService.update(id, updateContractDto);
  }

  // DELETE /contracts/:id
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.contractsService.remove(id);
  }
}
