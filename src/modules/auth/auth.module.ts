import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigReader } from 'src/config';

@Module({
  controllers: [AuthController],
  providers: [AuthService, ConfigReader],
})
export class AuthModule {}
