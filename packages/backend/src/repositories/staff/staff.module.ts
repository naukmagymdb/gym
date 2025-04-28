import { Module } from '@nestjs/common';
import { StaffController } from './staff.controller';
import { StaffRepository } from './staff.repository';

@Module({
  controllers: [StaffController],
  providers: [StaffRepository],
})
export class StaffModule {}
