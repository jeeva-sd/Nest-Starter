import { Controller, HttpCode, Post, Request } from '@nestjs/common';
import { RequestX, Sanitize, take } from 'src/server';
import { loginValidation } from './auth.validation';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  @Sanitize(loginValidation)
  public async create(@Request() req: RequestX) {
    const response = await this.authService.findAll(req.payload);
    return take(200, response);
  }
}
