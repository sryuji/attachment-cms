import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common'
import { ModuleRef, Reflector } from '@nestjs/core'
import { FastifyRequest } from 'fastify'
import { AccountScopesService } from '../app/account-scopes/account-scopes.service'
import { AuthUserDto } from '../app/auth/dto/auth-user.dto'
import { ScopeGetterArgs, ScopeGetterHandler, SCOPE_GETTER_KEY } from '../decorator/scope-getter.decorator'

/**
 * アカウントのScope操作の認可
 */
@Injectable()
export class AccountScopeGuard implements CanActivate {
  private accountScopesService: AccountScopesService
  constructor(private reflector: Reflector, private readonly moduleRef: ModuleRef) {}

  onModuleInit() {
    this.accountScopesService = this.moduleRef.get(AccountScopesService, { strict: false })
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const getter: ScopeGetterHandler = this.reflector.get<ScopeGetterHandler>(SCOPE_GETTER_KEY, context.getHandler())
    if (!getter) return true

    const ctx = context.switchToHttp()
    const req = ctx.getRequest<FastifyRequest>()
    const user: AuthUserDto = req.user as AuthUserDto
    const scopeId = await getter(req as ScopeGetterArgs)
    if (!scopeId || !user)
      throw new ForbiddenException(`No scopeId or user. scopeId: ${scopeId}, user.sub: ${user && user.sub}`)
    await this.accountScopesService.authorize(user, Number(scopeId))
    return true
  }
}
