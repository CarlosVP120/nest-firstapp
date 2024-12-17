import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.tokenExtractor(request);
    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      request.user = { token };
      return true;
    } catch (err) {
      console.error(err);
      throw new UnauthorizedException();
    }
  }

  tokenExtractor(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
