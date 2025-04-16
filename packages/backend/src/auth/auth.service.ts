import { Injectable } from '@nestjs/common';
import { AccountsHandler } from 'src/accounts/accountsHandler.service';
import { Role } from 'src/auth/utils/role.enum';
import { comparePasswords } from 'src/common/utils/bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly accountsHandler: AccountsHandler
    ) { }

    async validate(username: string, password: string, role: Role) {
        const loggedDB = await this.accountsHandler.getByPhone(role, username)

        if (loggedDB) {
            console.log(loggedDB)
            const matched = comparePasswords(password, loggedDB.login_password);
            if (matched) {
                console.log('Auth Success');
                return loggedDB;
            } else {
                console.log('Wrong Password');
                return null;
            }
        }

        console.log('Auth failed')
        return null;
    }
}
