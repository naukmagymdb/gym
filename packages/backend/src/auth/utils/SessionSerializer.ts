import { Injectable } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { AccountsHandler } from "src/accounts/services/accountsHandler.service";
import { CreateStaffDto } from "src/database/dtos/create-staff.dto";
import { CreateVisitorDto } from "src/database/dtos/create-visitor.dto";

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

    async deserializeUser(payload, done: (err, user: CreateStaffDto | CreateVisitorDto) => void) {
        console.log('Deserializing...');

        const loggedDB = await this.accountsHandler.getByPhone(payload.role, payload.phone)
        const deserialized = {...loggedDB, role: payload.role};
        
        return loggedDB ? done(null, deserialized) : done(null, null);
    } 
}