import { Module } from '@nestjs/common';
import { IndexController } from "./index.controller";
import { IndexService } from "./index.service";
import { AccountsHandler } from 'src/accounts/accountsHandler.service';

@Module({
  imports: [],
  controllers: [IndexController],
  providers: [
    IndexService,
    AccountsHandler
  ]
})
export class IndexModule {}
