import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/auth/utils/role.enum';
import { Staff } from 'src/database/entities/staff.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdminsService {
    constructor(
        @InjectRepository(Staff) private readonly staffRepository: Repository<Staff>
    ) { }

    async getAdminDashboard(phone: string, role: Role) {
        const admin = await this.getAdminByPhone(phone);
        if (!admin) throw new NotFoundException('Admin Not Found!');

        return admin;
    }

    async getAdminByPhone(phone: string) {
        const admin = await this.staffRepository.findOneBy({ phone_num: phone })

        if (!admin) return null;
        return {
            role: Role.Admin,
            ...admin
        }
    }
}
