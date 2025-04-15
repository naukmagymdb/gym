import { Module } from '@nestjs/common';
import { IndexController } from "./index.controller";
import { IndexService } from "./index.service";
import { DashboardHandler } from 'src/accounts/services/DashboardHandler';

@Module({
  imports: [],
  controllers: [IndexController],
  providers: [
    IndexService,
    DashboardHandler
  ]
})
export class IndexModule {}
