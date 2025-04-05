import * as dotenv from 'dotenv';

dotenv.config();


import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('gym');

  await app.listen(process.env.PORT || 3001);
}
bootstrap();
