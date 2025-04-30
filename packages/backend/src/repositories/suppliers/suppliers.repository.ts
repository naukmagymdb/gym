import { Injectable } from '@nestjs/common';
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

  findAll(sortBy: string, order: 'asc' | 'desc') {
    const allowedSortFields = ['edrpou', 'email', 'phone_num']; // whitelist fields
    const allowedOrders = ['asc', 'desc'];

    const safeSortBy = allowedSortFields.includes(sortBy) ? sortBy : 'goods_id';
    const safeOrder = allowedOrders.includes(order) ? order : 'asc';

    const query = `
      SELECT * FROM supplier
      ORDER BY ${safeSortBy} ${safeOrder}
    `;
    return this.db.any(query);
  }

  findOne(edrpou: number) {
    const query = `
        SELECT * FROM supplier WHERE edrpou = $1
      `;
    const res = this.db.oneOrNone(query, [edrpou]);
    return res;
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
      return this.findOne(edrpou); // No fields to update, return the existing supplier
    }

    const query = `
      UPDATE supplier
      SET ${fields.join(', ')}
      WHERE edrpou = $(edrpou)
      RETURNING *
    `;

    return await this.db.oneOrNone(query, values);
  }

  delete(edrpou: number) {
    const query = `
      DELETE FROM supplier 
      WHERE edrpou = $1
      RETURNING *
    `;
    return this.db.oneOrNone(query, [edrpou]);
  }

  getProductsBySupplier(edrpou: number, sortBy: string, order: 'asc' | 'desc') {
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

    return this.db.any(query, [edrpou]);
  }
}
