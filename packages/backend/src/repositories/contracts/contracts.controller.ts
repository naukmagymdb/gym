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
import { OptionalParseIntPipe } from 'src/common/pipes/optional-parse-int.pipe';
import { ContractsService } from './contracts.repository';
import { CreateContractDto } from './dto/create-contract.dto';
import { ProductInContractDTO } from './dto/product-in-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';

@Roles(Role.Admin)
@UseGuards(AuthenticatedGuard, RolesGuard)
@Controller('contracts')
export class ContractsController {
  constructor(private readonly contractsService: ContractsService) {}

  @Get()
  findAll(
    @Query('threshold', OptionalParseIntPipe) threshold?: number,
    @Query(
      'sortBy',
      new DefaultEnumPipe(ContractsService.getColumns(), 'contract_num'),
    )
    sortBy?: string,
    @Query('order', new DefaultEnumPipe(['asc', 'desc'], 'asc')) order?: string,
  ) {
    if (threshold)
      return this.contractsService.findHighValueGoodsByThreshold(
        threshold,
        sortBy,
        order,
      );
    return this.contractsService.findAll(sortBy, order);
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @Query(
      'sortBy',
      new DefaultEnumPipe(
        ContractsService.getColumnsInContractProductsTable(),
        'goods_id',
      ),
    )
    sortBy?: string,
    @Query('order', new DefaultEnumPipe(['asc', 'desc'], 'asc')) order?: string,
  ) {
    return this.contractsService.findOne(id, sortBy, order);
  }

  @Get(':id/items')
  findContractItems(
    @Param('id', ParseIntPipe) id: number,
    @Query(
      'sortBy',
      new DefaultEnumPipe(ContractsService.getColumns(), 'contract_num'),
    )
    sortBy?: string,
    @Query('order', new DefaultEnumPipe(['asc', 'desc'], 'asc')) order?: string,
  ) {
    return this.contractsService.findContractItems(id, sortBy, order);
  }

  @Post()
  create(@Body() createContractDto: CreateContractDto) {
    return this.contractsService.create(createContractDto);
  }

  @Patch(':id/products')
  addProductsToContract(
    @Param('id', ParseIntPipe) id: number,
    @Body() products: ProductInContractDTO[],
  ) {
    return this.contractsService.setProductsToContract(id, products);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateContractDto: UpdateContractDto,
  ) {
    return this.contractsService.update(id, updateContractDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.contractsService.remove(id);
  }
}
