import { Controller, Get, Request } from '@nestjs/common';
import { AdminsService } from './admins.service';

@Controller('admins')
export class AdminsController {
    constructor(
        private readonly adminsService: AdminsService
    ) {}
}
