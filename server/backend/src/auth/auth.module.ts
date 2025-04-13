import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { AdminsService } from 'src/admins/services/admins/admins.service';
import { Staff } from 'src/database/entities/staff.entity';
import { Visitor } from 'src/database/entities/visitor.entity';
import { UsersService } from 'src/users/services/users/users.service';
import { AuthController } from './controllers/auth/auth.controller';
import { AuthService } from './services/auth/auth.service';
import { LocalStrategy } from './utils/LocalStrategy';
import { SessionSerializer } from './utils/SessionSerializer';

@Module({
  imports: [
    TypeOrmModule.forFeature([Visitor, Staff]),
    PassportModule.register({ session: true })
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    AdminsService,
    UsersService,
    SessionSerializer
  ]
})
export class AuthModule { }
