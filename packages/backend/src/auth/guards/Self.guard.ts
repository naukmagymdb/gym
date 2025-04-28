import { CanActivate, ExecutionContext, ForbiddenException } from "@nestjs/common";
import { Request } from "express";


export class SelfGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const req: Request = context.switchToHttp().getRequest<Request>();

        const user = req.user;
        const paramId = parseInt(req.params.id, 10);

        if (user.id !== paramId) {
            throw new ForbiddenException();
        }

        return true;
    }

}