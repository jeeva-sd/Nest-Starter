import multiPart from '@fastify/multipart';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { NestFactory } from '@nestjs/core';
import { Logger, VersioningType } from '@nestjs/common';
import { AppModule } from './app.module';
import { AllExceptionsFilter, HttpExceptionFilter } from './handlers';
import { appConfig } from 'src/config';
import { extractError } from 'src/utils';

class Bootstrap {
  private logger: Logger;

  constructor() {
    this.logger = new Logger('Bootstrap');
  }

  async start() {
    try {
      const app = await this.createApp();

      await this.registerPluginsAndFilters(app);
      await this.enableVersioning(app);

      await this.listen(app);
    } catch (error) {
      console.error(`Failed to bootstrap application: ${extractError(error)}`);
      process.exit(1);
    }
  }

  private async createApp(): Promise<NestFastifyApplication> {
    const appAdapter = new FastifyAdapter(appConfig.get('server'));
    return await NestFactory.create<NestFastifyApplication>(AppModule, appAdapter);
  }

  private async registerPluginsAndFilters(app: NestFastifyApplication): Promise<void> {
    app.useGlobalFilters(new AllExceptionsFilter(), new HttpExceptionFilter());
    await app.register(multiPart, appConfig.get('multiPart'));
  }

  private async enableVersioning(app: NestFastifyApplication): Promise<void> {
    app.enableVersioning({ type: VersioningType.URI });
  }

  private async listen(app: NestFastifyApplication): Promise<void> {
    const appPort = appConfig.get('port');
    await app.listen(appPort);
    this.logger.log(`Listening on port ${appPort}`);
  }
}

export { Bootstrap };
