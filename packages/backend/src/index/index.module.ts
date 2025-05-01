import { Module } from '@nestjs/common';
import { RepositoryModule } from 'src/repositories/repository.module';
import { IndexController } from './index.controller';
import { IndexHandler } from './index.handler';

@Module({
  imports: [RepositoryModule],
  controllers: [IndexController],
  providers: [IndexHandler],
  exports: [IndexHandler],
})
export class IndexModule {}
