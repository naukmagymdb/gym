import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AdminsModule } from './admins/admins.module';
import { IndexModule } from './index/index.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseService } from './database/database.service';
import { AuthModule } from './auth/auth.module';
import { Session } from './database/entities/session.entity';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST, 
      port: parseInt(<string>process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      autoLoadEntities: true,
      synchronize: false,
      retryAttempts: 3
    }),
    TypeOrmModule.forFeature([Session]),
    IndexModule, UsersModule, AdminsModule, AuthModule
  ],
  controllers: [],
  providers: [DatabaseService],
})
export class AppModule { }
