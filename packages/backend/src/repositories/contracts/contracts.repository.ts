import { Injectable, NotFoundException } from '@nestjs/common';
import pgPromise from 'pg-promise';
import { DatabaseService } from 'src/database/database.service';
import { RepositoryService } from '../repository.service';
import { SuppliersService } from '../suppliers/suppliers.repository';
import { CreateContractDto } from './dto/create-contract.dto';
import { GetContractDto } from './dto/get-contract.dto';
import {
  AddProductToContractDTO,
  ProductInContractDTO as ProductInContractDto,
} from './dto/product-in-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';

@Injectable()
export class ContractsService {
  private db: pgPromise.IDatabase<any>;
  private suppliers: SuppliersService;

  private static columns = [
    'contract_num',
    'edrpou',
    'total_sum',
    'contract_date',
  ];

  constructor(
    private readonly databaseService: DatabaseService,
    private readonly repositoryService: RepositoryService,
  ) {
    this.db = databaseService.getDb();
    this.suppliers = new SuppliersService(databaseService);
  }

  async findAll(sortBy: string, order: string): Promise<GetContractDto[]> {
    const query = `
      SELECT * FROM contract
      ORDER BY ${sortBy} ${order}
    `;
    return await this.db.any(query);
  }

  async findOne(
    id: number,
    sortBy: string,
    order: string,
  ): Promise<GetContractDto> {
    console.log('Find one contract with id', id);
    const queryFindContract = `
      SELECT *
      FROM contract
      WHERE contract_num = $1
    `;

    let contract: GetContractDto;
    try {
      contract = await this.db.one<GetContractDto>(queryFindContract, [id]);
    } catch (error) {
      console.error('Error finding contract:', id);
      throw new NotFoundException(`Contract with id ${id} not found`);
    }

    console.log('Getting products for contract:', id);

    const queryProductsInContract = `
      SELECT *
      FROM contract_products
        INNER JOIN products ON contract_products.goods_id = products.goods_id
      WHERE contract_products.contract_num = $1
      ORDER BY contract_products.${sortBy} ${order}
    `;

    const productsInContract = await this.db.any<ProductInContractDto>(
      queryProductsInContract,
      [id],
    );

    contract.products = productsInContract;

    return contract;
  }

  async update(
    id: number,
    updateContractDto: UpdateContractDto,
  ): Promise<GetContractDto> {
    console.log('Updating contract with id:', id);

    const { setClause, values } = this.repositoryService.prepareUpdateData({
      ...updateContractDto,
      contract_num: id,
    });

    const queryUpdateContract = `
      UPDATE contract
      SET ${setClause.join(', ')}, total_sum = 0
      WHERE contract_num = $(contract_num)
    `;
    await this.db.oneOrNone(queryUpdateContract, values);

    const queryDeleteProducts = `
        DELETE FROM contract_products
        WHERE contract_num = $(id)
      `;
    await this.db.none(queryDeleteProducts, { id });

    return this.findOne(id, 'goods_id', 'asc');
  }

  async findContractItems(id: number, sortBy: string, order: string) {
    console.log('Find contract items with id:', id);
    const query = `
      SELECT *
      FROM contract_products
        INNER JOIN products ON contract_products.goods_id = products.goods_id
      WHERE contract_num = $1
      ORDER BY ${sortBy} ${order}
    `;
    try {
      return await this.db.one<ProductInContractDto>(query, [id]);
    } catch (error) {
      console.error('Error finding items  for contract :', id);
      throw new NotFoundException(`Contract with id ${id} not found`);
    }
  }

  async findHighValueGoodsByThreshold(
    threshold: number,
    sortBy: string,
    order: string,
  ) {
    console.log('Finding high value goods by threshold:', threshold);

    // First get the contracts with high-value goods
    const contractsQuery = `
      SELECT c.contract_num, c.contract_date, c.total_sum, c.edrpou
      FROM contract c 
        WHERE NOT EXISTS (
            SELECT 1
            FROM contract_products cp JOIN products p ON cp.goods_id = p.goods_id
            WHERE cp.contract_num = c.contract_num
            AND NOT (cp.goods_price > $1)
            )       
        ORDER BY c.${sortBy} ${order}
    `;

    const contracts = await this.db.any(contractsQuery, [threshold]);

    // If no contracts found, return empty array
    if (!contracts.length) {
      return [];
    }

    // Get contract numbers to use in the IN clause
    const contractNums = contracts.map((c) => c.contract_num);

    // Get all products for these contracts
    const productsQuery = `
      SELECT cp.contract_num, cp.goods_id, cp.goods_price, cp.goods_amount, 
             cp.total_goods_price, p.goods_name
      FROM contract_products cp 
      JOIN products p ON cp.goods_id = p.goods_id
      WHERE cp.contract_num IN ($(contractNums:csv))
      AND cp.goods_price > $(threshold)
    `;

    const products = await this.db.any(productsQuery, {
      contractNums,
      threshold,
    });

    // Group products by contract number
    const contractProductsMap = products.reduce((map, product) => {
      if (!map[product.contract_num]) {
        map[product.contract_num] = [];
      }
      map[product.contract_num].push(product);
      return map;
    }, {});

    // Add products to each contract
    return contracts.map((contract) => ({
      ...contract,
      products: contractProductsMap[contract.contract_num] || [],
    }));
  }

  async create(createContractDto: CreateContractDto): Promise<GetContractDto> {
    console.log('Creating contract:', createContractDto);

    const queryInsertContract = `
      INSERT INTO contract (edrpou,total_sum,contract_date)
      VALUES  ($(edrpou), $(total_sum), $(contract_date))
      RETURNING *
    `;
    return await this.db.one<GetContractDto>(queryInsertContract, {
      ...createContractDto,
      total_sum: 0,
    });
  }

  async setProductsToContract(id: number, products: AddProductToContractDTO[]) {
    console.log('Adding products to contract:', id);

    const contract = await this.findOne(id, 'goods_id', 'asc');

    // Get product details from supplier_products table
    const enrichedProducts: ProductInContractDto[] =
      await this.enrichProductDetails(products, contract.edrpou);

    await this.checkForProductsExistenceinSuppliers(
      enrichedProducts,
      contract.edrpou,
    );

    const queryDeleteProducts = `
      DELETE FROM contract_products
      WHERE contract_num = $(id)
    `;
    await this.db.none(queryDeleteProducts, { id });

    const total_sum =
      await this.insertProductsIntoContractProductsTableAndReturnTotalSum(
        enrichedProducts,
        id,
      );

    const queryUpdateContractTotalSum = `
      UPDATE contract
      SET total_sum = $(total_sum)
      WHERE contract_num = $(contract_num)
      RETURNING *
      `;

    await this.db.one<GetContractDto>(queryUpdateContractTotalSum, {
      contract_num: id,
      total_sum: total_sum,
    });

    return this.findOne(id, 'goods_id', 'asc');
  }

  // New method to get product details from supplier_products
  async enrichProductDetails(
    products: AddProductToContractDTO[],
    edrpou: number,
  ): Promise<ProductInContractDto[]> {
    const enrichedProducts: ProductInContractDto[] = [];

    for (const product of products) {
      // Check if the product exists in supplier_products
      const supplierProductQuery = `
        SELECT sp.goods_id
        FROM supplier_products sp
        WHERE sp.edrpou = $(edrpou) AND sp.goods_id = $(goods_id)
      `;

      try {
        // Verify the product exists for this supplier
        await this.db.one(supplierProductQuery, {
          edrpou,
          goods_id: product.goods_id,
        });

        // Get product name from the products table
        const productQuery = `
          SELECT p.goods_name
          FROM products p
          WHERE p.goods_id = $(goods_id)
        `;

        const productDetails = await this.db.one(productQuery, {
          goods_id: product.goods_id,
        });

        // Get price from the most recent contract for this supplier and product, if any
        const priceQuery = `
          SELECT cp.goods_price
          FROM contract_products cp
          JOIN contract c ON cp.contract_num = c.contract_num
          WHERE c.edrpou = $(edrpou) AND cp.goods_id = $(goods_id)
          ORDER BY c.contract_date DESC
          LIMIT 1
        `;

        let price = 0;

        try {
          const priceDetails = await this.db.one(priceQuery, {
            edrpou,
            goods_id: product.goods_id,
          });
          price = priceDetails.goods_price;
        } catch (err) {
          // If no price found, use a default or ask user to provide it
          console.log('No previous price found for product:', product.goods_id);
          // Use a reasonable default price - in production, you might want to handle this differently
          price = 0;
        }

        enrichedProducts.push({
          goods_id: product.goods_id,
          goods_name: productDetails.goods_name,
          goods_price: price,
          goods_amount: product.goods_amount,
          total_goods_price: price * product.goods_amount,
        });
      } catch (error) {
        console.log('Error:', error);
        console.error('Product not found in supplier:', product.goods_id);
        throw new NotFoundException(
          `Product with id ${product.goods_id} not found in supplier ${edrpou}`,
        );
      }
    }

    return enrichedProducts;
  }

  async remove(id: number) {
    console.log('Removing contract with id:', id);
    try {
      const queryDeleteContract = `
      DELETE FROM contract
      WHERE contract_num = $1
      RETURNING *
    `;
      return await this.db.one(queryDeleteContract, [id]);
    } catch (error) {
      console.error('Error deleting contract:', id);
      throw new NotFoundException(`Contract with id ${id} not found`);
    }
  }

  static getColumns() {
    return this.columns;
  }

  static getColumnsInContractProductsTable() {
    return [
      'goods_id',
      'goods_price',
      'goods_amount',
      'total_goods_price',
      'goods_name',
    ];
  }

  async checkForProductsExistenceinSuppliers(
    products: ProductInContractDto[],
    edrpou: number,
  ): Promise<any> {
    const getProductsFromSupplier = `
      SELECT goods_id
      FROM supplier_products
      WHERE edrpou = $(edrpou)
      `;
    const productsFromSupplier = await this.db.any<{
      goods_id: number | string;
    }>(getProductsFromSupplier, {
      edrpou: edrpou,
    });

    for (const product of products) {
      const productExists = productsFromSupplier.some(
        (p) => p.goods_id === product.goods_id,
      );
      if (!productExists) {
        console.error(
          'Product with id:',
          product.goods_id,
          'does not exist in supplier',
        );
        throw new NotFoundException(
          `Product with id ${product.goods_id} does not exist in supplier`,
        );
      }
    }
  }

  async insertProductsIntoContractProductsTableAndReturnTotalSum(
    products: ProductInContractDto[],
    id: number,
  ): Promise<number> {
    let total_sum = 0;

    const insertProductsIntoContractProductsTable = `
      INSERT INTO contract_products (contract_num, goods_id, goods_price, goods_amount)
      VALUES ($(contract_num), $(goods_id), $(goods_price), $(goods_amount) )
      RETURNING *
    `;

    try {
      for (const product of products) {
        await this.db.one(insertProductsIntoContractProductsTable, {
          ...product,
          contract_num: id,
        });

        total_sum += product.goods_price * product.goods_amount;
      }
    } catch (error) {
      console.error('One of the products does not exist:', id);
      throw new NotFoundException(`One of the products does not exist`);
    }
    return total_sum;
  }
}
