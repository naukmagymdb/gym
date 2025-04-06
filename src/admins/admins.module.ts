import { Module } from '@nestjs/common';
import { AdminsController } from './controllers/admins/admins.controller';
import { AdminsService } from './controllers/admins/admins.service';
import { AdminsService } from './services/admins/admins.service';

@Module({
  controllers: [AdminsController],
  providers: [AdminsService]
})
export class AdminsModule {}
