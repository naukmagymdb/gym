import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminsService } from 'src/admins/services/admins/admins.service';
import { Staff } from 'src/database/entities/staff.entity';
import { Visitor } from 'src/database/entities/visitor.entity';
import { UsersService } from 'src/users/services/users/users.service';
import { comparePasswords } from 'src/utils/bcrypt';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly adminsService: AdminsService
    ) { }

    async validate(username: string, password: string, role: string) {
        let loggedDB;

        if (role === 'user') {
            loggedDB = await this.usersService.getUserByPhone(username);
        } else {
            loggedDB = await this.adminsService.getAdminByPhone(username);
        }

        if (loggedDB) {
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
