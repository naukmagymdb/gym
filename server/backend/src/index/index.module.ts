import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminsService } from "src/admins/services/admins/admins.service";
import { Department } from "src/database/entities/department.entity";
import { Staff } from "src/database/entities/staff.entity";
import { Visitor } from "src/database/entities/visitor.entity";
import { UsersService } from "src/users/services/users/users.service";
import { IndexController } from "./controllers/index/index.controller";
import { IndexService } from "./services/index/index.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Visitor, Staff, Department])
  ],
  controllers: [IndexController],
  providers: [UsersService, AdminsService, IndexService]
})
export class IndexModule {}
