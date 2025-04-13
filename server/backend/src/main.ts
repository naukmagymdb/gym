import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DatabaseService } from './database/database.service';
import * as session from 'express-session';
import * as passport from 'passport';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('gym');

  const databaseService = app.get(DatabaseService);
  await databaseService.initializeDatabase();

  const typeormStore = databaseService.getSessionStore();

  app.use(
    session({
      name: 'SESSION_ID',
      secret: process.env.SECRET,
      resave: true,
      saveUninitialized: false,
      rolling: true,
      cookie: {
        maxAge: 60 * 1000
      },
      store: typeormStore
    }));

  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(process.env.PORT || 3001);
}
bootstrap();
