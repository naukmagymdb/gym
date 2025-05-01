import { Injectable } from '@nestjs/common';
import pgPromise from 'pg-promise';
import { DatabaseService } from 'src/database/database.service';
import { CreateContractDto } from './dto/create-contract.dto';
import { GetContractDto } from './dto/get-contract.dto';
import { ProductInContractDTO as ProductInContractDto } from './dto/product-in-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';

@Injectable()
export class ContractsService {
  private db: pgPromise.IDatabase<any>;

  constructor(private readonly databaseService: DatabaseService) {
    this.db = databaseService.getDb();
  }

  async findAll(sortBy: string, order: string): Promise<GetContractDto[]> {
    const allowedSortFields = [
      'contract_num',
      'edrpou',
      'total_sum',
      'contract_date',
    ]; // whitelist fields
    const allowedOrders = ['asc', 'desc'];

    const safeSortBy = allowedSortFields.includes(sortBy)
      ? sortBy
      : 'contract_num';
    const safeOrder = allowedOrders.includes(order) ? order : 'asc';

    console.log('/contracts/findAll, sortBy:', sortBy, 'order:', order);

    const query = `
      SELECT * FROM contract
      ORDER BY ${safeSortBy} ${safeOrder}
    `;
    return await this.db.any(query);
  }

  async findOne(id: number): Promise<GetContractDto> {
    console.log('/contracts/findOne, id:', id);
    const queryFindContract = `
      SELECT *
      FROM contract
      WHERE contract_num = $1
    `;

    const contract = await this.db.oneOrNone<GetContractDto>(
      queryFindContract,
      [id],
    );

    if (!contract) return contract;

    console.log('getting products for contract:', id);

    const queryProductsInContract = `
      SELECT *
      FROM contract_products
        INNER JOIN products ON contract_products.goods_id = products.goods_id
      WHERE contract_products.contract_num = $1
    `;

    const productsInContract = await this.db.any<ProductInContractDto>(
      queryProductsInContract,
      [id],
    );

    contract.Products = productsInContract;

    return contract;
  }

  async update(id: number, updateContractDto: UpdateContractDto) {
    return `This action updates a #${id} contract`;
  }

  async findContractItems(id: number, sortBy: string, order: string) {
    return `This action returns all items for contract #${id}`;
  }
  async create(createContractDto: CreateContractDto) {
    return 'This action adds a new contract';
  }

  addProductsToContract(id: number, products: ProductInContractDto[]) {
    throw new Error('Method not implemented.');
  }
  createContractSupplierDependencies(id: number, supplierIds: number[]) {
    throw new Error('Method not implemented.');
  }

  async remove(id: number) {
    return `This action removes a #${id} contract`;
  }
}
