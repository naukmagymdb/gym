import { Module } from '@nestjs/common';
import { RepositoryService } from '../repository.service';
import { AbonementTypeController } from './abon-type.controller';
import { AbonementTypeRepository } from './abon-type.repository';

@Module({
  controllers: [AbonementTypeController],
  providers: [AbonementTypeRepository, RepositoryService],
})
export class AbonementTypeModule {}
