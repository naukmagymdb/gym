import { Module } from '@nestjs/common';
import { RepositoryService } from '../repository.service';
import { TrainingModule } from '../trainings/training.module';
import { StaffController } from './staff.controller';
import { StaffRepository } from './staff.repository';

@Module({
  imports: [TrainingModule],
  controllers: [StaffController],
  providers: [StaffRepository, RepositoryService],
  exports: [StaffRepository],
})
export class StaffModule {}
