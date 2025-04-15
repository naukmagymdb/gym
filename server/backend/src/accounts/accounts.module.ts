import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AdminsModule } from './admins/admins.module';
import { PhoneLookupHandler } from './services/PhoneLookupHandler';
import { DashboardHandler } from './services/DashboardHandler';

@Module({
  imports: [
    UsersModule,
    AdminsModule
  ],
  providers: [
    PhoneLookupHandler,
    DashboardHandler
  ],
  exports: [
    PhoneLookupHandler,
    DashboardHandler
  ]
})
export class AccountsModule {}
