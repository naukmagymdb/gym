import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './utils/LocalStrategy';
import { SessionSerializer } from './utils/SessionSerializer';
import { AuthService } from './auth.service';
import { AccountsHandler } from 'src/accounts/accountsHandler.service';


@Module({
  imports: [
    PassportModule.register({ session: true })
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    SessionSerializer,
    AccountsHandler
  ]
})
export class AuthModule { }
