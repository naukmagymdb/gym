import { Injectable } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { AdminsService } from "src/admins/services/admins/admins.service";
import { Visitor } from "src/database/entities/visitor.entity";
import { UsersService } from "src/users/services/users/users.service";

@Injectable()
export class SessionSerializer extends PassportSerializer {
    constructor(
        private readonly usersService: UsersService,
        private readonly adminsService: AdminsService
    ) {
        super();
    }

    serializeUser(logged, done: (err, user) => void) {
        console.log('Serializing...');
        done(null, { phone: logged.phone_num, role: logged.role });
    }

    async deserializeUser(payload, done: (err, user: Visitor) => void) {
        console.log('Deserializing...');

        let loggedDB;

        if (payload.role === 'user') {
            loggedDB = await this.usersService.getUserByPhone(payload.phone);
        } else if (payload.role === 'admin') {
            loggedDB = await this.adminsService.getAdminByPhone(payload.phone);
        }

        return loggedDB ? done(null, loggedDB) : done(null, null);
    } 
}