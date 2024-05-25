import { Injectable } from '@nestjs/common';
import { LoginPayload } from './auth.validation';

@Injectable()
export class AuthService {
  constructor() {}

  async findAll(payload: LoginPayload) {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
