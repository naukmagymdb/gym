import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    if (request.isAuthenticated && request.isAuthenticated()) {
      return true;
    }
    throw new UnauthorizedException(
      'You must be logged in to access this resource',
    );
  }
}
