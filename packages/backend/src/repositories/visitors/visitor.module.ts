import { Module } from '@nestjs/common';
import { VisitorController } from './visitor.controller';
import { VisitorRepository } from './visitor.repository';

@Module({
  imports: [],
  controllers: [VisitorController],
  providers: [VisitorRepository],
})
export class VisitorModule {}
