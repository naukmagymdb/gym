import { Module } from '@nestjs/common';
import { AdminsController } from './admins.controller';
import { AdminsService } from './admins.service';
import { UtilsService } from '../services/utils.service';


@Module({
  imports: [],
  controllers: [AdminsController],
  providers: [
    AdminsService,
    UtilsService
  ],
  exports: [AdminsService]
})
export class AdminsModule {}
