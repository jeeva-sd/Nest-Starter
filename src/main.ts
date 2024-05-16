import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigReader } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigReader);
  await app.listen(configService.get('port'));
}
bootstrap();
