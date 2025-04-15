import { Module } from '@nestjs/common';
import { AdminsController } from './controllers/admins/admins.controller';
import { AdminsService } from './services/admins/admins.service';


@Module({
  imports: [],
  controllers: [AdminsController],
  providers: [AdminsService]
})
export class AdminsModule {}
