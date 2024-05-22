import * as path from 'path';
import multiPart from '@fastify/multipart';
import fastifyStatic from '@fastify/static';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { NestFactory } from '@nestjs/core';
import { Logger, VersioningType } from '@nestjs/common';
import { AppModule } from './app.module';
import { AllExceptionsFilter, HttpExceptionFilter } from './handlers';
import { ConfigReader } from 'src/config';

// Retrieve multipart options from config service
const multipartOptions = {
  limits: {
    fileSize: 5242880, // Limit file size to 5MB by default
    fieldSize: 1024 * 1024, // Limit field size to 1MB by default
    fields: 10, // Limit number of fields to 10 by default
    files: 1, // Limit number of files to 1 by default
  },
};

const serverOptions = {
  logger: false, // Fastify logger
  bodyLimit: 1048576, // Limit request body size to 1MB
  caseSensitive: false, // Case-insensitive routing
  ignoreTrailingSlash: true, // Ignore trailing slashes in routes
  ignoreDuplicateSlashes: true,
};

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(serverOptions));

  const configService = app.get(ConfigReader);
  const appPort = configService.get('port');

  // Exception filters
  app.useGlobalFilters(new AllExceptionsFilter(), new HttpExceptionFilter());
  app.enableVersioning({ type: VersioningType.URI });
  app.register(multiPart, multipartOptions);
  app.register(fastifyStatic, {
    root: path.join(__dirname, 'public'), // Serve the 'public' folder
    prefix: '/uploads', // Serve files from the root
  });

  await app.listen(appPort);
  const logger = new Logger('Bootstrap');
  logger.log(`Listening on port ${appPort}`);
}

bootstrap();
