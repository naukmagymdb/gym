import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Staff } from 'src/database/entities/staff.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdminsService {
    constructor(
        @InjectRepository(Staff) private readonly staffRepository: Repository<Staff>
    ) { }

    async getAdminDashboard(phone: string) {
        const admin = await this.getAdminByPhone(phone);
        if (!admin) throw new NotFoundException('Admin Not Found!');

        return {
            role: 'admin',
            ...admin
        }
    }

    getAdminByPhone(phone: string) {
        return this.staffRepository.findOneBy({ phone_num: phone });
    }
}
