import { Controller, HttpCode, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RequestX, Sanitize, take } from 'src/handlers';
import { loginValidation } from './auth.validation';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  @Sanitize(loginValidation)
  public create(@Request() req: RequestX) {
    return take(200, req.payload);
  }
}
