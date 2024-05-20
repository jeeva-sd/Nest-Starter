import { Controller, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RequestX, Sanitize, take } from 'src/handlers';
import { loginRule } from './auth.rule';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @Sanitize(loginRule)
  public create(@Request() req: RequestX) {
    return take(200, req.payload);
  }
}
