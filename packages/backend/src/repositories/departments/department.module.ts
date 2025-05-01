import { Module } from '@nestjs/common';
import { DepartmentController } from './department.controller';
import { DepartmentEmailRepository } from './repositories/department-email.repository';
import { DepartmentPhoneRepository } from './repositories/department-phone.repository';
import { DepartmentHandler } from './repositories/department.handler';
import { DepartmentRepository } from './repositories/department.repository';

@Module({
  controllers: [DepartmentController],
  providers: [
    DepartmentRepository,
    DepartmentPhoneRepository,
    DepartmentEmailRepository,
    DepartmentHandler,
  ],
})
export class DepartmentModule {}
