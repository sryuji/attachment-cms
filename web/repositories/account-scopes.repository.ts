import ApiRepository from './api.repository'
import { AccountScopeForm } from '~/types/attachment-cms-server/app/account-scopes/dto/account-scope.form'
import { AccountScopesSerializer } from '~/types/attachment-cms-server/app/account-scopes/serializer/account-scopes.serializer'

export class AccountScopesRepository extends ApiRepository {
  async create(data: AccountScopeForm): Promise<void> {
    await this.patch(`/account-scopes`, data)
  }

  async delete(id: number): Promise<void> {
    await this.del(`/account-scopes/${id}`)
  }

  async findAll({ scopeId }: { scopeId: number }): Promise<AccountScopesSerializer> {
    return await this.get(`/account-scopes`, { params: { scopeId } })
  }
}
