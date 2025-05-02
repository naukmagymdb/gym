import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { IndexModule } from './index/index.module';
import { RepositoryModule } from './repositories/repository.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule.forRoot({
      retryAttempts: 5,
      delay: 3000,
    }),
    IndexModule,
    AuthModule,
    RepositoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
