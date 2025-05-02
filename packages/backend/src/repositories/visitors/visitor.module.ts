import { Module } from '@nestjs/common';
import { AbonementModule } from '../abonements/abonement.module';
import { RepositoryService } from '../repository.service';
import { TrainingModule } from '../trainings/training.module';
import { VisitorController } from './visitor.controller';
import { VisitorRepository } from './visitor.repository';

@Module({
  imports: [TrainingModule, AbonementModule],
  controllers: [VisitorController],
  providers: [VisitorRepository, RepositoryService],
  exports: [VisitorRepository],
})
export class VisitorModule {}
