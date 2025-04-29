import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { IDatabase } from 'pg-promise';
import { DatabaseService } from 'src/database/database.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  private db: IDatabase<any>;

  constructor(private readonly databaseService: DatabaseService) {
    this.db = databaseService.getDb();
  }

  async create(createProductDto: CreateProductDto) {
    const productExists = await this.isPresentInDatabase(createProductDto.goods_name);

    if (productExists) {
      throw new ConflictException("Cannot create item as it already exists");
    }

    const query = `
        INSERT INTO products (good_name)
        VALUES ($1)
        RETURNING *;
      `;

    const result = await this.db.one(query, [createProductDto.goods_name]);
    return result;
  }

  async findAll() {
    return this.db.query("SELECT * FROM products");
  }

  async findOne(id: number) {
    const productIdExists = await this.isValidProductId(id);
    if (!productIdExists) {
      throw new NotFoundException("Invalid ID provided. Please provide a valid ID.");
    }

    const query = `
        SELECT *
        FROM products
        WHERE good_id = $1
      `;

    const result = await this.db.one(query, [id]);
    return result;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const productExists = await this.isPresentInDatabase(updateProductDto.goods_name);
    if (productExists) {
      throw new ConflictException("Cannot update item as it already exists");
    }

    const productIdExists = await this.isValidProductId(id);
    if (!productIdExists) {
      throw new NotFoundException("Invalid ID provided. Please provide a valid ID.");
    }

    const query = `
        UPDATE products
        SET good_name = $1
        WHERE good_id = $2
        RETURNING *;
      `;

    const result = await this.db.one(query, [updateProductDto.goods_name, id]);
    return result;
  }

  async remove(id: number) {
    const productIdExists = await this.isValidProductId(id);
    if (!productIdExists) {
      throw new NotFoundException("Invalid ID provided. Please provide a valid ID.");
    }

    const query = `
        DELETE FROM products
        WHERE good_id = $1
        RETURNING *;
      `;

    return this.db.one(query, [id]);
  }

  private async isValidProductId(id: number): Promise<boolean> {
    const products = await this.findAll();
    return products.some(product => product.good_id == id);
  }

  private async isPresentInDatabase(name: string): Promise<boolean> {
    const products = await this.findAll();
    return products.some(product => product.good_name === name);
  }
}
