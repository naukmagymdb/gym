import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Visitor } from 'src/database/entities/visitor.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Visitor) private readonly vistorRepository: Repository<Visitor>
    ) { }

    async getUserDashboard(phone: string) {
        const user = await this.getUserByPhone(phone);
        if (!user) throw new NotFoundException('Admin Not Found!');

        return {
            role: 'user',
            ...user
        }
    }

    getUserByPhone(phone: string) {
        return this.vistorRepository.findOneBy({ phone_num: phone });
    }
}
