import { Module } from '@nestjs/common';
import { AdminsService } from "src/admins/services/admins/admins.service";
import { UsersService } from "src/users/services/users/users.service";
import { IndexController } from "./controllers/index/index.controller";
import { IndexService } from "./services/index/index.service";

@Module({
  imports: [],
  controllers: [IndexController],
  providers: [
    UsersService, 
    AdminsService,
    IndexService
  ]
})
export class IndexModule {}
