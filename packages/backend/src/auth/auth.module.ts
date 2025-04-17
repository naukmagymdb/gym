import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './utils/LocalStrategy';
import { SessionSerializer } from './utils/SessionSerializer';
import { AuthService } from './auth.service';
import { AccountsModule } from 'src/accounts/accounts.module';


@Module({
  imports: [
    PassportModule.register({ session: true }),
    AccountsModule
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    SessionSerializer
  ]
})
export class AuthModule { }
