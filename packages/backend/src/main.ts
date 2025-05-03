import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as session from 'express-session';
import * as passport from 'passport';
import { AppModule } from './app.module';
import { setGlobalTimezone } from './common/configs/timezone.config';
import { DatabaseService } from './database/database.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.CLIENT_URL || 'http://localhost:1234',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  });

  app.setGlobalPrefix('api');
  setGlobalTimezone();

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
        maxAge: 14 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      },
      store: dbService.getSessionStore(),
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Gym Management System')
    .setDescription('The Gym Management System API description')
    .setVersion('1.0')
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('documentation', app, swaggerDocument);

  const host = process.env.HOST || 'localhost';
  const port = process.env.PORT || 3001;

  await app.listen(port, () => {
    console.log(`The server is running on ${host}:${port}`);
    console.log(`Documentation is running on ${host}:${port}/documentation`);
  });
}
bootstrap();
