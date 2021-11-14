import { Action, Mutation, Module, VuexModule, config } from 'vuex-module-decorators'
import { AccountForm } from '~/types/attachment-cms-server/app/accounts/dto/account.form'
import { Account } from '~/types/attachment-cms-server/db/entity/account.entity'
import { $api } from '~/utils/api-accessor'
import { Sentry } from '~/utils/sentry'

config.rawError = true

@Module({
  name: 'accounts',
  stateFactory: true,
  namespaced: true,
})
export default class extends VuexModule {
  account: Partial<Account> = {} // NOTE: 初期化せずundefinedのままだと、reactive機能が動かないので注意

  @Mutation
  setAccount(account: Account) {
    this.account = account
  }

  get hasAccount(): boolean {
    return !!(this.account && this.account.id)
  }

  get accountScope() {
    return (scopeId: number) =>
      this.account.accountScopes && this.account.accountScopes.find((r) => r.scopeId === scopeId)
  }

  get role() {
    return (scopeId: number) => this.accountScope(scopeId)?.role
  }

  get isOwner() {
    return (scopeId: number) => this.role(scopeId) === 'owner'
  }

  @Action
  async fetchAccount(): Promise<void> {
    const data = await $api.accounts.findOne()
    this.setAccount(data.account)
    Sentry.configureScope((scope) => {
      scope.setUser({ id: `${this.account.id}`, email: this.account.email })
    })
  }

  @Action
  async updateAccount(form: AccountForm): Promise<void> {
    const data = await $api.accounts.update(form)
    this.setAccount(data.account)
  }
}
