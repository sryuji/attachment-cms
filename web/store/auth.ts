import { Action, Module, VuexModule, config } from 'vuex-module-decorators'
import { $api } from '~/utils/api-accessor'
import { UnauthorizedError } from '~/utils/errors'
import { accountsStore } from '~/utils/store-accessor'

config.rawError = true

@Module({
  name: 'auth',
  stateFactory: true,
  namespaced: true,
})
export default class extends VuexModule {
  get isLoggedIn() {
    return !!accountsStore.account
  }

  @Action
  async checkAuth(): Promise<boolean> {
    try {
      await accountsStore.getAccount()
      return true
    } catch (err: any) {
      if (err instanceof UnauthorizedError) return false
      throw err
    }
  }

  @Action
  async signOut(): Promise<void> {
    if (this.isLoggedIn) return
    await $api.auth.signOut()
    accountsStore.setAccount(null)
  }
}
