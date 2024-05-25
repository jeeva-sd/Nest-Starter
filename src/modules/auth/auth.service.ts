import { Injectable } from '@nestjs/common';
import { ConfigReader } from 'src/config';
import { LoginPayload } from './auth.validation';

@Injectable()
export class AuthService {
  constructor(private configReader: ConfigReader) {}

  async findAll(payload: LoginPayload) {
    const port = this.configReader.get('port');
    console.log(port, payload, 'port');
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
