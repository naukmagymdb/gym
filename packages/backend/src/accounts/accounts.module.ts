import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AdminsModule } from './admins/admins.module';
import { AccountsHandler } from './accountsHandler.service';

@Module({
  imports: [
    UsersModule,
    AdminsModule
  ],
  providers: [
    AccountsHandler
  ],
  exports: [
    AccountsHandler
  ]
})
export class AccountsModule {}
