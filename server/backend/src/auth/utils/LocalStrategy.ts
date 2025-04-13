import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { Request } from "express";
import { AuthService } from "../services/auth/auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            usernameField: 'phone',
            passReqToCallback: true
        });
    }

    async validate(req: Request, username: string, password: string) {
        const role = req.body.role;
        const logged = await this.authService.validate(username, password, role);

        if (!logged) {
            throw new UnauthorizedException();
        }

        return {
            role,
            ...logged
        };
    }
}
