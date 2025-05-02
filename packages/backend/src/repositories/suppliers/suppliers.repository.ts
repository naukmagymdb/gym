import { BadRequestException, Injectable } from '@nestjs/common';
import pgPromise from 'pg-promise';
import { DatabaseService } from 'src/database/database.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';

@Injectable()
export class SuppliersService {
  private db: pgPromise.IDatabase<any>;

  constructor(private readonly databaseService: DatabaseService) {
    this.db = databaseService.getDb();
  }

  async create(supplierDto: CreateSupplierDto) {
    try {
      const query = `
      INSERT INTO supplier (edrpou, email, phone_num)
      VALUES ($(edrpou), $(email), $(phone_num)) 
      RETURNING *
    `;
      const res = await this.db.one(query, supplierDto);
      return res;
    } catch (e) {
      return 'Supplier with this EDRPOU already exists';
    }
  }

  async findAll(sortBy: string, order: 'asc' | 'desc') {
    const allowedSortFields = ['edrpou', 'email', 'phone_num']; // whitelist fields
    const allowedOrders = ['asc', 'desc'];

    const safeSortBy = allowedSortFields.includes(sortBy) ? sortBy : 'goods_id';
    const safeOrder = allowedOrders.includes(order) ? order : 'asc';

    const query = `
      SELECT * FROM supplier
      ORDER BY ${safeSortBy} ${safeOrder}
    `;
    return await this.db.any(query);
  }

  async findOne(condition: Record<string, any>) {
    const keys = Object.keys(condition);
    const values = Object.values(condition);

    const whereClause = keys
      .map((key, i) => `${key} = $${i + 1}`)
      .join(' AND ');
    const sql = `SELECT * FROM supplier WHERE ${whereClause} LIMIT 1`;

    return this.db.oneOrNone(sql, values);
  }

  async getSuppliersOnlySupplySpecifiedProduct(goods_name: string) {
    const query = `
    SELECT sup.EDRPOU, sup.email, sup.phone_num
    FROM supplier sup
    WHERE NOT EXISTS (
        SELECT 1
        FROM supplier_Products sp  JOIN products p ON sp.goods_id = p.goods_id
        WHERE sp.EDRPOU = sup.EDRPOU
        AND NOT (p.goods_name = $1)
      )`;
    return await this.db.any(query, [goods_name]);
  }

  async update(edrpou: number, updateSupplierDto: UpdateSupplierDto) {
    const fields = [];
    const values: any = { edrpou };

    if (updateSupplierDto.email !== undefined) {
      fields.push('email = $(email)');
      values.email = updateSupplierDto.email;
    }

    if (updateSupplierDto.phone_num !== undefined) {
      fields.push('phone_num = $(phone_num)');
      values.phone_num = updateSupplierDto.phone_num;
    }

    if (fields.length === 0) {
      throw new BadRequestException('No fields to update');
    }

    const query = `
      UPDATE supplier
      SET ${fields.join(', ')}
      WHERE edrpou = $(edrpou)
      RETURNING *
    `;

    return await this.db.oneOrNone(query, values);
  }

  async delete(edrpou: number) {
    const query = `
      DELETE FROM supplier 
      WHERE edrpou = $1
      RETURNING *
    `;
    return await this.db.oneOrNone(query, [edrpou]);
  }

  async getProductsBySupplier(
    edrpou: number,
    sortBy: string,
    order: 'asc' | 'desc',
  ) {
    const allowedSortFields = ['goods_id', 'goods_name']; // whitelist fields
    const allowedOrders = ['asc', 'desc'];

    const safeSortBy = allowedSortFields.includes(sortBy) ? sortBy : 'goods_id';
    const safeOrder = allowedOrders.includes(order) ? order : 'asc';

    const query = `
      SELECT *
      FROM products
      WHERE goods_id IN (
        SELECT goods_id
        FROM supplier_products
        WHERE edrpou = $1
      )
      ORDER BY ${safeSortBy} ${safeOrder}
    `;

    return await this.db.any(query, [edrpou]);
  }
}
