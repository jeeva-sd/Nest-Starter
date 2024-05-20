import { Controller, Get, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { RequestX } from './handlers';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(@Request() req: RequestX) {
    console.log(req.payload);
    return this.appService.getHello();
  }
}
