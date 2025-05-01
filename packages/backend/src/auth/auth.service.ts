import { Injectable, Logger } from '@nestjs/common';
import { AccountsHandler } from 'src/accounts/services/accountsHandler.service';
import { Role } from 'src/auth/utils/role.enum';
import { comparePasswords } from 'src/common/utils/bcrypt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(private readonly accountsHandler: AccountsHandler) {}

  async validate(phone: string, password: string, role: Role) {
    const loggedDB = await this.accountsHandler.getByPhone(role, phone);

    if (loggedDB) {
      this.logger.log(loggedDB);
      const matched = comparePasswords(password, loggedDB.login_password);
      if (matched) {
        this.logger.log('Auth Success');
        return loggedDB;
      } else {
        this.logger.error('Wrong Password');
        return null;
      }
    }

    this.logger.error('Auth failed');
    return null;
  }
}
