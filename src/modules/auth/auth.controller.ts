import { Controller, HttpCode, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RequestX, Sanitize, take } from 'src/server';
import { loginValidation } from './auth.validation';

@Controller({
  version: '1',
  path: 'auth',
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  @Sanitize(loginValidation)
  public create(@Request() req: RequestX) {
    return take(200, req.payload);
  }
}
