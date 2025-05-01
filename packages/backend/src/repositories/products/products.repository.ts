import { Injectable } from '@nestjs/common';
import { IDatabase } from 'pg-promise';
import { DatabaseService } from 'src/database/database.service';
import { ProductDto } from './dto/product.dto';

@Injectable()
export class ProductsService {
  private db: IDatabase<any>;

  constructor(private readonly databaseService: DatabaseService) {
    this.db = databaseService.getDb();
  }

  async create(createProductDto: ProductDto) {
    const query = `
        INSERT INTO products (goods_name)
        VALUES ($1)
        RETURNING *;
      `;

    return await this.db.one(query, [createProductDto.goods_name]);
  }

  async findAll({
    sortBy,
    order,
  }: {
    sortBy: 'goods_id' | 'goods_name';
    order?: 'asc' | 'desc';
  }) {
    const sql = `
        SELECT * FROM products
        ORDER BY ${sortBy} ${order}
    `;

    return this.db.any(sql);
  }

  async findOne(condition: Record<string, any>) {
    const keys = Object.keys(condition);
    const values = Object.values(condition);

    const whereClause = keys
      .map((key, i) => `${key} = $${i + 1}`)
      .join(' AND ');
    const sql = `SELECT * FROM products WHERE ${whereClause} LIMIT 1`;

    return this.db.oneOrNone(sql, values);
  }

  async update(id: number, updateProductDto: ProductDto) {
    const query = `
        UPDATE products
        SET goods_name = $1
        WHERE goods_id = $2
        RETURNING *;
    `;

    const result = await this.db.oneOrNone(query, [
      updateProductDto.goods_name,
      id,
    ]);
    return result;
  }

  async delete(id: number) {
    const query = `
        DELETE FROM products
        WHERE goods_id = $1
        RETURNING *;
      `;

    return this.db.oneOrNone(query, [id]);
  }
}
