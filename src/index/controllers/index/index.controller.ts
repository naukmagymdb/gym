import { Controller, Get, Request } from '@nestjs/common';
import { IndexService } from 'src/index/services/index/index.service';


@Controller()
export class IndexController {
    constructor(
        private readonly indexService: IndexService,
    ) { }

        @Get()
        async getDashboard(@Request() req) {
        const {role, id} = req.logged;
        return await this.indexService.getDashboard(role, id); 
    }
}
