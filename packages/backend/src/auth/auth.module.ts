import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { IndexModule } from 'src/index/index.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './utils/LocalStrategy';
import { SessionSerializer } from './utils/SessionSerializer';

@Module({
  imports: [PassportModule.register({ session: true }), IndexModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, SessionSerializer],
})
export class AuthModule {}
