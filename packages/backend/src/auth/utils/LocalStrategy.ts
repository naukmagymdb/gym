import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    private readonly logger = new Logger(LocalStrategy.name);
    constructor(private readonly authService: AuthService) {
        super({
            usernameField: 'phone',
            passReqToCallback: true,
        });
    }

    async validate(req: Request, phone: string, password: string) {
        this.logger.log('validate');
        const role = req.body.role;
        const logged = await this.authService.validate(phone, password, role);

        if (!logged) {
            throw new UnauthorizedException();
        }

        return {
            role,
            ...logged,
        };
    }
}
