import { Injectable } from '@nestjs/common';
import { DepartmentEmailRepository } from './department-email.repository';
import { DepartmentPhoneRepository } from './department-phone.repository';

@Injectable()
export class DepartmentHandler {
  private repoStrategies: Record<'phone_numbers' | 'emails', any>;

  constructor(
    private readonly emailStrategy: DepartmentEmailRepository,
    private readonly phoneNumberStrategy: DepartmentPhoneRepository,
  ) {
    this.repoStrategies = {
      phone_numbers: phoneNumberStrategy,
      emails: emailStrategy,
    };
  }

  async handleCreate(
    fieldName: 'emails' | 'phone_numbers',
    departmentId: number,
    data: string[],
  ): Promise<any[]> {
    const result = [];

    if (data) {
      for (const item of data) {
        const createdItem = await this.repoStrategies[fieldName].create(
          departmentId,
          item,
        );

        if (createdItem) result.push(createdItem);
      }
    }

    return result;
  }

  async handleUpdate(
    fieldName: 'emails' | 'phone_numbers',
    departmentId: number,
    data: string[],
  ): Promise<any[]> {
    const repo = this.repoStrategies[fieldName];
    await repo.deleteByDepartmentId(departmentId);

    const createdItems = await Promise.all(
      (data || []).map((item) => repo.create(departmentId, item)),
    );

    return createdItems;
  }
}
