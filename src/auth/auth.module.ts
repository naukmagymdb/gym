import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth/auth.controller';
import { AuthService } from './services/auth/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Visitor } from 'src/database/entities/visitor.entity';
import { Staff } from 'src/database/entities/staff.entity';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './utils/LocalStrategy';
import { AdminsService } from 'src/admins/services/admins/admins.service';
import { UsersService } from 'src/users/services/users/users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Visitor, Staff]),
    PassportModule
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    AdminsService,
    UsersService
  ]
})
export class AuthModule {}
