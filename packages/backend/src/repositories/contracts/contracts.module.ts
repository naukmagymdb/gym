import { Module } from '@nestjs/common';
import { RepositoryService } from '../repository.service';
import { ContractsController } from './contracts.controller';
import { ContractsService } from './contracts.repository';

@Module({
  controllers: [ContractsController],
  providers: [ContractsService, RepositoryService],
})
export class ContractsModule {}
