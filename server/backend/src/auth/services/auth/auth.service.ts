import { Injectable } from '@nestjs/common';
import { Role } from 'src/auth/utils/role.enum';
import { comparePasswords } from 'src/utils/bcrypt';
import { AuthHelperService } from './authHelper.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly authHelperService: AuthHelperService
    ) { }

    async validate(username: string, password: string, role: Role) {
        const loggedDB = await this.authHelperService.getByPhone(role, username)

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
