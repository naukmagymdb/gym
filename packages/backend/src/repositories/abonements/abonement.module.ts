import { Module } from '@nestjs/common';
import { RepositoryService } from '../repository.service';
import { AbonementController } from './abonement.controller';
import { AbonementRepository } from './abonement.repository';

@Module({
  controllers: [AbonementController],
  providers: [AbonementRepository, RepositoryService],
  exports: [AbonementRepository],
})
export class AbonementModule {}
