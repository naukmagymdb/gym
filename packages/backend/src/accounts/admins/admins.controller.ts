import { Controller, Get, Request } from '@nestjs/common';
import { AdminsService } from './admins.service';

@Controller('')
export class AdminsController {
    constructor(
        private readonly adminsService: AdminsService
    ) {}
}
