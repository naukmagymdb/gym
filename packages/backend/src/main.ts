import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as session from 'express-session';
import helmet from 'helmet';
import * as passport from 'passport';
import { AppModule } from './app.module';
import { DatabaseService } from './database/database.service';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: ['error', 'warn', 'log', 'debug', 'verbose'],
    });

    app.enableCors({
        origin: process.env.CLIENT_URL || 'http://localhost:1234',
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    });

    app.setGlobalPrefix('api');

    app.use(
        helmet({
            contentSecurityPolicy: {
                useDefaults: false,
                directives: {
                    defaultSrc: ["'self'"],
                    connectSrc: ["'self'", 'http://localhost:1234'],
                },
            },
        }),
    );

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
        console.log(
            `Documentation is running on ${host}:${port}/documentation`,
        );
    });
}
bootstrap();
