import { Global, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Global()
@Injectable()
export class HashingService {
  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async compareHash(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
