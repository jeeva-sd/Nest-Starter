import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigReader } from '../config';
import { Logger, VersioningType } from '@nestjs/common';
import { AllExceptionsFilter, HttpExceptionFilter } from './handlers';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

  const configService = app.get(ConfigReader);
  const appPort = configService.get('port');

  // Exception filters
  app.useGlobalFilters(new AllExceptionsFilter(), new HttpExceptionFilter());
  app.enableVersioning({
    type: VersioningType.URI,
  });

  await app.listen(appPort);
  const logger = new Logger('Bootstrap');
  logger.log(`Listening on port ${appPort}`);
}

bootstrap();
