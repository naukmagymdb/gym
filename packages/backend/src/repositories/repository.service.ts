import { Injectable } from '@nestjs/common';

@Injectable()
export class RepositoryService {
  prepareUpdateData(updateDto: Record<string, any>) {
    const setClause: string[] = [];
    const values: Record<string, any> = {};

    for (const [key, value] of Object.entries(updateDto)) {
      if (value !== undefined && value !== null) {
        setClause.push(`${key} = $(${key})`);
        values[key] = value;
      }
    }

    return { setClause, values };
  }
}
