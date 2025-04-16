import { Injectable } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { VisitorDto } from "src/database/dtos/visitor.dto";
import { StaffDto } from "src/database/dtos/staff.dto";
import { AccountsHandler } from "src/accounts/accountsHandler.service";

@Injectable()
export class SessionSerializer extends PassportSerializer {
    constructor(
        private readonly accountsHandler: AccountsHandler
    ) {
        super();
    }

    serializeUser(logged, done: (err, user) => void) {
        console.log('Serializing...');
        done(null, { phone: logged.phone_num, role: logged.role });
    }

    async deserializeUser(payload, done: (err, user: VisitorDto | StaffDto) => void) {
        console.log('Deserializing...');

        const loggedDB = await this.accountsHandler.getByPhone(payload.role, payload.phone)
        return loggedDB ? done(null, loggedDB) : done(null, null);
    } 
}