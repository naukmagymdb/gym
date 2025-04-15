import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from 'src/auth/guards/LocalAuthGuard';

@Controller('auth')
export class AuthController {

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async logIn(@Request() req) {
        return req.body;
    }

    @UseGuards(LocalAuthGuard)
    @Post('admin/login')
    async logInAdmin(@Request() req) {
        return req.body;
    }
}
