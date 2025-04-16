import { Module } from '@nestjs/common';
import { IndexController } from "./index.controller";
import { IndexService } from "./index.service";
import { AccountsModule } from 'src/accounts/accounts.module';

@Module({
  imports: [AccountsModule],
  controllers: [IndexController],
  providers: [
    IndexService
  ]
})
export class IndexModule {}
