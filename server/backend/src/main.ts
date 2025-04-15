import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DatabaseService } from './database/database.service';
import * as session from 'express-session';
import * as passport from 'passport';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('gym');

  const dbService = app.get(DatabaseService);
  await dbService.waitForConnection();

  app.use(
    session({
      name: 'SESSION_ID',
      secret: process.env.SECRET,
      resave: true,
      saveUninitialized: false,
      rolling: true,
      cookie: {
        maxAge: 60 * 1000,
        httpOnly: true
      },
      store: dbService.getSessionStore()
    }));

  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(process.env.PORT || 3001, () => {
    console.log(`The server is running on port ${process.env.PORT}`)
  });
}
bootstrap();
