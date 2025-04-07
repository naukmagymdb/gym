import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Visitor } from 'src/database/entities/visitor.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Visitor])
  ],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
