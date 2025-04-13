import { Module } from '@nestjs/common';
import { AdminsController } from './controllers/admins/admins.controller';
import { AdminsService } from './services/admins/admins.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Staff } from 'src/database/entities/staff.entity';

@Module({
  imports: [
      TypeOrmModule.forFeature([Staff])
    ],
  controllers: [AdminsController],
  providers: [AdminsService]
})
export class AdminsModule {}
