import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {

    async getUserDashboard(id) {
        const user = await this.getUserById(id);
        if (!user) throw new NotFoundException('Admin Not Found!');

        return {
            role: 'user',
            ...user
        }
    }

    getUserById(id) {
        return {};
    }
}
