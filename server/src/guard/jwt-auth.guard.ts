import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

/**
 * JWTトークンの認証
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context)
  }

  handleRequest<U>(err: Error, user: U, info: Error, context: ExecutionContext): U {
    if (err || info) throw new UnauthorizedException(err || info)
    if (!user) throw new UnauthorizedException('Can not get user from token.')
    return user
  }
}
