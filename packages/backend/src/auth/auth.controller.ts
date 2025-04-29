import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from 'src/auth/guards/LocalAuth.guard';

@UseGuards(LocalAuthGuard)
@Controller('auth')
export class AuthController {

    @Post('login')
    async logIn(@Request() req) {
        return req.body;
    }

    @Post('admin/login')
    async logInAdmin(@Request() req) {
        return req.body;
    }
}
