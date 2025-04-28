import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {

  constructor(
      private readonly databaseService: DatabaseService
    ) {}

    async create(createProductDto: CreateProductDto) {
      const db = this.databaseService.getDb();
    
      const productExists = await this.isPresentInDatabase(createProductDto.good_name);
    
      if (productExists) {
        throw new ConflictException("Cannot create item as it already exists");
      }
    
      const query = `
        INSERT INTO products (good_name)
        VALUES ($1)
        RETURNING *;
      `;

      const result = await db.one(query, [createProductDto.good_name]);
      return result;
    }

    async findAll() {
      const db = this.databaseService.getDb();
      return db.query("SELECT * FROM products");
    }

    async findOne(id: number) {
      const db = this.databaseService.getDb();
    
      const productIdExists = await this.isValidProductId(id);
      if (!productIdExists) {
        throw new NotFoundException("Invalid ID provided. Please provide a valid ID.");
      }

      const query = `
        SELECT *
        FROM products
        WHERE good_id = $1
      `;

      const result = await db.one(query, [id]);
      return result;
    }

    async update(id: number, updateProductDto: UpdateProductDto) {
      const db = this.databaseService.getDb();
    
      const productExists = await this.isPresentInDatabase(updateProductDto.good_name);
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

      const result = await db.one(query, [updateProductDto.good_name, id]);
      return result;
    }

    async remove(id: number) {
      const db = this.databaseService.getDb();
    
      const productIdExists = await this.isValidProductId(id);
      if (!productIdExists) {
        throw new NotFoundException("Invalid ID provided. Please provide a valid ID.");
      }

      const query = `
        DELETE FROM products
        WHERE good_id = $1
        RETURNING *;
      `;

      return db.one(query, [id]);
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
