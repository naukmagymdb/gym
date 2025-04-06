import { Module } from '@nestjs/common';
import { IndexController } from './controllers/index/index.controller';
import { UsersService } from 'src/users/services/users/users.service';
import { AdminsService } from 'src/admins/services/admins/admins.service';
import { IndexService } from './services/index/index.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Visitor } from 'src/database/entities/visitor.entity';
import { Staff } from 'src/database/entities/staff.entity';
import { Department } from 'src/database/entities/department.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Visitor, Staff, Department])
  ],
  controllers: [IndexController],
  providers: [UsersService, AdminsService, IndexService]
})
export class IndexModule {}
