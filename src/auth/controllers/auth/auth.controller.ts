import { ClassSerializerInterceptor, Controller, Post, Request, UseGuards, UseInterceptors } from '@nestjs/common';
import { LocalAuthGuard } from 'src/auth/utils/LocalAuthGuard';

@Controller('auth')
export class AuthController {

    @UseGuards(LocalAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    @Post('login')
    async logIn(@Request() req) {
        return req.user;
    }

    @UseGuards(LocalAuthGuard)
    @Post('admin/login')
    async logInAdmin(@Request() req) {
        return req.user;
    }
}
