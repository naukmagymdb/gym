import { Module } from '@nestjs/common';
import { RepositoryService } from '../repository.service';
import { TrainingController } from './training.controller';
import { TrainingRepository } from './training.repository';

@Module({
  controllers: [TrainingController],
  providers: [TrainingRepository, RepositoryService],
  exports: [TrainingRepository],
})
export class TrainingModule {}
