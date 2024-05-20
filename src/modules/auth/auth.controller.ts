import { Controller, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RequestX, Sanitize } from 'src/handlers';
import { loginRule } from './auth.rule';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @Sanitize(loginRule)
  create(@Request() req: RequestX) {
    console.log(req);
    return req.payload;
  }
}
