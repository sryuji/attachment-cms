import ApiRepository from './api.repository'
import { AccountScopeForm } from '~/types/attachment-cms-server/app/account-scopes/dto/account-scope.form'
import { AccountScopesSerializer } from '~/types/attachment-cms-server/app/account-scopes/serializer/account-scopes.serializer'
import { UpdateAccountScopeForm } from '~/types/attachment-cms-server/app/account-scopes/dto/update-account-scope.form'

export class AccountScopesRepository extends ApiRepository {
  async create(data: AccountScopeForm): Promise<void> {
    await this.post(`/account-scopes`, data)
  }

  async update(id: number, data: UpdateAccountScopeForm): Promise<void> {
    await this.patch(`/account-scopes/${id}`, data)
  }

  async delete(id: number): Promise<void> {
    await this.del(`/account-scopes/${id}`)
  }

  async deleteByScopeId(scopeId: number): Promise<void> {
    await this.del(`/account-scopes`, { params: { scopeId } })
  }

  async findAll({ scopeId }: { scopeId: number }): Promise<AccountScopesSerializer> {
    return await this.get(`/account-scopes`, { params: { scopeId } })
  }
}
