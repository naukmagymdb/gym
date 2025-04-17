import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { IndexModule } from './index/index.module';
import { AuthModule } from './auth/auth.module';
import { AccountsModule } from './accounts/accounts.module';
import { UsersModule } from './accounts/users/users.module';
import { AdminsModule } from './accounts/admins/admins.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../../.env',
    }),
    DatabaseModule.forRoot({
      retryAttempts: 5,
      delay: 3000
    }),
    IndexModule, AuthModule, AccountsModule, UsersModule, AdminsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
