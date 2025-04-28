import { Module } from '@nestjs/common';
import { DepartmentController } from './department.controller';
import { DepartmentRepository } from './department.repository';

@Module({
  controllers: [DepartmentController],
  providers: [DepartmentRepository],
})
export class DepartmentModule {}
