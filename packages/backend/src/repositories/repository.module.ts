import { Module } from '@nestjs/common';
import { DepartmentModule } from './departments/department.module';
import { ProductsModule } from './products/products.module';
import { StaffModule } from './staff/staff.module';
import { TrainingModule } from './trainings/training.module';
import { VisitorModule } from './visitors/visitor.module';

@Module({
  imports: [
    DepartmentModule,
    StaffModule,
    VisitorModule,
    ProductsModule,
    TrainingModule,
  ],
})
export class RepositoryModule {}
