import { Module } from '@nestjs/common';
import { IndexController } from './controllers/index/index.controller';
import { UsersService } from 'src/users/services/users/users.service';
import { AdminsService } from 'src/admins/services/admins/admins.service';
import { IndexService } from './services/index/index.service';

@Module({
  controllers: [IndexController],
  providers: [UsersService, AdminsService, IndexService]
})
export class IndexModule {}
