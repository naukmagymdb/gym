import { Module } from '@nestjs/common';
import { RepositoryService } from '../repository.service';
import { StaffController } from './staff.controller';
import { StaffRepository } from './staff.repository';

@Module({
  controllers: [StaffController],
  providers: [StaffRepository, RepositoryService],
})
export class StaffModule {}
