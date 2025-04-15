import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AdminsService } from 'src/admins/services/admins/admins.service';
import { UsersService } from 'src/users/services/users/users.service';
import { AuthController } from './controllers/auth/auth.controller';
import { AuthService } from './services/auth/auth.service';
import { LocalStrategy } from './utils/LocalStrategy';
import { SessionSerializer } from './utils/SessionSerializer';
import { AuthHelperService } from './services/auth/authHelper.service';

@Module({
  imports: [
    PassportModule.register({ session: true })
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    AdminsService,
    UsersService,
    SessionSerializer,
    AuthHelperService
  ]
})
export class AuthModule { }
