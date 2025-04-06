import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class AdminsService {

    async getAdminDashboard(id) {
        const admin = await this.getAdminById(id);
        if (!admin) throw new NotFoundException('Admin Not Found!');

        return {
            role: 'admin',
            ...admin
        }
    }

    getAdminById(id) {
        return {};
    }
}
