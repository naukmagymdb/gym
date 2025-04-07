import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Visitor } from 'src/database/entities/visitor.entity';
import { Role } from 'src/auth/utils/role.enum';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Visitor) private readonly vistorRepository: Repository<Visitor>
    ) { }

    async getUserDashboard(phone: string) {
        const user = await this.getUserByPhone(phone);
        if (!user) throw new NotFoundException('User Not Found!');

        return user;
    }

    async getUserByPhone(phone: string) {
        const user = await this.vistorRepository.findOneBy({ phone_num: phone })
        
        if (!user) return null;
        return {
            role: Role.User,
            ...user
        }
    }
}
