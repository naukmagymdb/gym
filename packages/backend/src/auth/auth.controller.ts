import {
  Controller,
  Request as NestRequest,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request as ExpressRequest, Response } from 'express';
import { LocalAuthGuard } from 'src/auth/guards/LocalAuth.guard';

@Controller('auth')
export class AuthController {
  @UseGuards(LocalAuthGuard)
  @Post('login')
  logIn(@NestRequest() req) {
    return req.body;
  }

  @UseGuards(LocalAuthGuard)
  @Post('admin/login')
  logInAdmin(@NestRequest() req) {
    return req.body;
  }

  @Post('logout')
  logout(@Req() req: ExpressRequest, @Res() res: Response) {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ message: 'Logout failed', error: err });
      }

      req.session.destroy((err) => {
        if (err) {
          return res
            .status(500)
            .json({ message: 'Session destruction failed', error: err });
        }

        res.clearCookie('SESSION_ID');
        return res.status(200).json({ message: 'Logged out successfully' });
      });
    });
  }
}
