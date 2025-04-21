import { Module } from '@nestjs/common';
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { UtilsService } from '../services/utils.service';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [
    UsersService,
    UtilsService
  ],
  exports: [UsersService]
})
export class UsersModule { }
