import { Injectable } from '@nestjs/common';
import { Role } from 'src/auth/utils/role.enum';
import { comparePasswords } from 'src/common/utils/bcrypt';
import { IndexHandler } from 'src/index/index.handler';

@Injectable()
export class AuthService {
  constructor(private readonly indexHandler: IndexHandler) {}

  async validate(phone: string, password: string, role: Role) {
    const loggedDB = await this.indexHandler.getByPhone(role, phone);

    if (loggedDB) {
      console.log(loggedDB);
      console.log(password);
      const matched = comparePasswords(password, loggedDB.login_password);
      if (matched) {
        console.log('Auth Success');
        return loggedDB;
      } else {
        console.log('Wrong Password');
        return null;
      }
    }

    console.log('Auth failed');
    return null;
  }
}
