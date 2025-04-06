import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AdminsModule } from './admins/admins.module';
import { IndexModule } from './index/index.module';


@Module({
  imports: [IndexModule, UsersModule, AdminsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
