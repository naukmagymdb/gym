import { Module } from '@nestjs/common';
import { AbonementTypeModule } from './abon-type/abon-type.module';
import { DepartmentModule } from './departments/department.module';
import { ProductsModule } from './products/products.module';
import { StaffModule } from './staff/staff.module';
import { SuppliersModule } from './suppliers/suppliers.module';
import { TrainingModule } from './trainings/training.module';
import { VisitorModule } from './visitors/visitor.module';

@Module({
  imports: [
    DepartmentModule,
    StaffModule,
    VisitorModule,
    ProductsModule,
    SuppliersModule,
    TrainingModule,
    AbonementTypeModule,
  ],
  exports: [StaffModule, VisitorModule],
})
export class RepositoryModule {}
