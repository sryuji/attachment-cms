import ApiRepository from './api.repository'
import { AccountScopeForm } from '~/types/attachment-cms-server/app/account-scopes/dto/account-scope.form'

export class AccountScopesRepository extends ApiRepository {
  async create(data: AccountScopeForm): Promise<void> {
    await this.patch(`/account-scopes`, data)
  }

  async delete(id: number): Promise<void> {
    await this.del(`/account-scopes/${id}`)
  }
}
