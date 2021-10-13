import { Action, Mutation, Module, VuexModule, config } from 'vuex-module-decorators'
import { AccountForm } from '~/types/attachment-cms-server/app/accounts/dto/account.form'
import { Account } from '~/types/attachment-cms-server/db/entity/account.entity'
import { $api } from '~/utils/api-accessor'

config.rawError = true

@Module({
  name: 'accounts',
  stateFactory: true,
  namespaced: true,
})
export default class AuthModule extends VuexModule {
  account: Account

  @Mutation
  setAccount(account: Account) {
    this.account = account
  }

  @Action
  async getAccount(): Promise<void> {
    const data = await $api.accounts.findOne()
    this.setAccount(data.account)
  }

  @Action
  async updateAccount(form: AccountForm): Promise<void> {
    const data = await $api.accounts.update(form)
    this.setAccount(data.account)
  }
}
