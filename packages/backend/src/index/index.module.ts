import { Module } from '@nestjs/common';
import { IndexController } from "./index.controller";
import { AccountsModule } from 'src/accounts/accounts.module';

@Module({
  imports: [AccountsModule],
  controllers: [IndexController],
  providers: []
})
export class IndexModule {}
