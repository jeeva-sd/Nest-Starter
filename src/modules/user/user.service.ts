import { Injectable } from '@nestjs/common';
import { localDB, localSchema } from 'src/database';

@Injectable()
export class UserService {
  async findAll() {
    const a = await localDB.select().from(localSchema.user);
    return a;
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
