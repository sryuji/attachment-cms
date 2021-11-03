import ApiRepository from './api.repository'
import { AccountSerializer } from 'types/attachment-cms-server/app/accounts/serializer/account.serializer'
import { AccountForm } from '~/types/attachment-cms-server/app/accounts/dto/account.form'

export class AccountsRepository extends ApiRepository {
  findOne(): Promise<AccountSerializer> {
    return this.get(`/accounts`)
  }

  update(data: AccountForm): Promise<AccountSerializer> {
    return this.patch(`/accounts`, data)
  }

  delete(): Promise<void> {
    return this.del(`/accounts`)
  }
}
