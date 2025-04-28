import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AccountsModule } from './accounts/accounts.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { IndexModule } from './index/index.module';
import { ProductsModule } from './products/products.module';
import { RepositoryModule } from './repositories/repository.module';
import { TestController } from './test.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../../.env',
    }),
    DatabaseModule.forRoot({
      retryAttempts: 5,
      delay: 3000,
    }),
    IndexModule,
    AuthModule,
    AccountsModule,
    RepositoryModule,
    ProductsModule
  ],
  controllers: [TestController],
  providers: [],
})
export class AppModule {}
