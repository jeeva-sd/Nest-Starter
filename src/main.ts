import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigReader } from './config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigReader);
  const appPort = configService.get('port');

  await app.listen(appPort);
  const logger = new Logger('Bootstrap');
  logger.log(`Listening on port ${appPort}`);
}

bootstrap();
