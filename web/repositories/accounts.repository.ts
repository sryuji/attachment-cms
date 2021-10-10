import ApiRepository from './api.repository'

export class AccountsRepository extends ApiRepository {
  findOne(accountId: number) {
    return this.get(`/accounts/${accountId}`)
  }

  update(accountId: number, data: any) {
    return this.patch(`/accounts/${accountId}`, data)
  }

  delete(accountId: number) {
    return this.del(`/accounts/${accountId}`)
  }
}
