import { Controller, Get, Request } from '@nestjs/common';
import { AdminsService } from 'src/admins/services/admins/admins.service';

@Controller('admins')
export class AdminsController {
    constructor(
        private readonly adminsService: AdminsService
    ) {}

    @Get()
    getAdminDashboard(@Request() req) {

    }
}
