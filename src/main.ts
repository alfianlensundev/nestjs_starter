import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import {
    FastifyAdapter,
    NestFastifyApplication,
  } from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
    const app = await NestFactory.create(AppModule,new FastifyAdapter());
    app.useGlobalPipes(new ValidationPipe());

    const config = new DocumentBuilder()
                    .setTitle('Auth Example')
                    .setDescription('API for authentication')
                    .setVersion('1.0.0')
                    .addTag('Auth')
                    .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);

    await app.listen(3330);
}
bootstrap();
