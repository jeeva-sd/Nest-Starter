import { Module } from '@nestjs/common';
import { AuthModule } from '../modules/auth/auth.module';
import { UserModule } from 'src/modules/user/user.module';

@Module({
  imports: [AuthModule, UserModule],
  providers: [],
})
export class AppModule {}
