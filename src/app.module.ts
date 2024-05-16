import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigReader } from './config';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, ConfigReader],
})
export class AppModule {}
