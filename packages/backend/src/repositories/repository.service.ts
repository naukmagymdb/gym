import { Injectable } from '@nestjs/common';

@Injectable()
export class RepositoryService {
  prepareUpdateData(updateDto: Record<string, any>) {
    const setClause: string[] = [];
    const values: Record<string, any> = {};

    for (const [key, value] of Object.entries(updateDto)) {
      if (value !== null && value !== undefined) {
        setClause.push(`${key} = $(${key})`);
        values[key] = value;
      }
    }

    return { setClause, values };
  }

  getWhereClause(
    queryParams: Record<string, any>,
    allowedColumns: readonly string[],
  ) {
    const conditions: string[] = [];
    const values: any = {};

    Object.entries(queryParams).forEach(([key, value]) => {
      if (
        value !== null &&
        value !== undefined &&
        allowedColumns.includes(key)
      ) {
        conditions.push(`${key} = $(${key})`);
        values[key] = value;
      }
    });

    const whereClause = conditions.length
      ? `WHERE ${conditions.join(' AND ')}`
      : '';

    return { whereClause, values };
  }
}
