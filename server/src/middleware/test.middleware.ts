import { Injectable, NestMiddleware } from '@nestjs/common'
import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from 'fastify'
import { AuthService } from '../app/auth/auth.service'
import { AuthUserDto } from '../app/auth/dto/auth-user.dto'
import { Account } from '../db/entity/account.entity'

const isProduction = process.env.NODE_ENV === 'production'

export function judgeSkipAuth(req: FastifyRequest) {
  return !isProduction && req.headers.authorization === 'Bearer test'
}

// middlewares -> guards -> interceptors -> pipeの順のため、
@Injectable()
export class TestMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}

  async use(req: FastifyRequest, res: FastifyReply, next: HookHandlerDoneFunction) {
    if (judgeSkipAuth(req)) {
      const account = await Account.findOne(1)
      const authUser = new AuthUserDto(account)
      const token = await this.authService.generateJwtAccessToken(authUser)
      req.headers.authorization = `Bearer ${token}`
    }
    next()
  }
}
