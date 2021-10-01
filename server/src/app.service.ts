import { Injectable } from '@nestjs/common';

const userMap = {
  admin: 'admin',
};
@Injectable()
export class AppService {
  login({ username, password }): boolean {
    if (userMap[username] === password) return true;
    return false;
  }
}
