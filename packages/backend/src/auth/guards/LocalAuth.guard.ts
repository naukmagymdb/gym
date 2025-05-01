import { ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
    private readonly logger = new Logger(LocalAuthGuard.name);
    async canActivate(context: ExecutionContext) {
        this.logger.log('canActivate');
        const result = (await super.canActivate(context)) as boolean;
        this.logger.log('canActivate result', result);
        const request = context.switchToHttp().getRequest();
        await super.logIn(request);
        return result;
    }
}
