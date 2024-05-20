import { Module } from '@nestjs/common';
import { ConfigReader } from './config';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [AuthModule],
  providers: [ConfigReader],
})
export class AppModule {}
