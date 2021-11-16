import { Route } from 'vue-router/types'
import { Action, Module, VuexModule, config, Mutation } from 'vuex-module-decorators'
import { removeAccessToken } from '~/services/authentication.helper'
import { JWT_AVAILABLE_REFRESH, JWT_KEY } from '~/services/constants'
import { $api } from '~/utils/api-accessor'
import { deleteModel, fetchProperty, saveProperty } from '~/utils/local-storage'
import { accountsStore, scopesStore } from '~/utils/store-accessor'

config.rawError = true

@Module({
  name: 'auth',
  stateFactory: true,
  namespaced: true,
})
export default class extends VuexModule {
  accessToken: string = null
  isCheckedAuth: boolean = false
  /**
   * middlewareでページ単位の認証フラグを確認し、ここに反映して情報共有される
   */
  ignoreAuth: boolean = false
  redirectTo: Route = null

  get isLoggedIn() {
    return !!this.accessToken
  }

  @Mutation
  setAccessToken(token: string) {
    this.accessToken = token
  }

  @Mutation
  clearAuthState() {
    this.accessToken = null
    this.isCheckedAuth = false
    this.ignoreAuth = false
  }

  @Mutation
  setRedirectTo(route: Route) {
    this.redirectTo = route
  }

  @Mutation
  clearRedirectTo() {
    this.redirectTo = null
  }

  @Mutation
  checkedAuth() {
    this.isCheckedAuth = true
  }

  @Mutation
  setIgnoreAuth(flag: boolean) {
    this.ignoreAuth = flag
  }

  @Action
  async refreshAccessToken(): Promise<void> {
    const data = await $api.auth.refreshAccessToken()
    this.setAccessToken(data.accessToken)
    saveProperty(JWT_KEY, JWT_AVAILABLE_REFRESH, true)

    this.fetchRequiredDataOnLoggedIn()
  }

  @Action
  async fetchRequiredDataOnLoggedIn(): Promise<void> {
    const promise1: Promise<void> = scopesStore.hasScopes ? Promise.resolve() : accountsStore.fetchAccount()
    const promise2: Promise<void> = accountsStore.hasAccount ? Promise.resolve() : accountsStore.fetchAccount()
    const promises = [promise1, promise2]

    try {
      if (this.isLoggedIn) {
        await Promise.all(promises)
        return
      }

      const hasRefresh = fetchProperty(JWT_KEY, JWT_AVAILABLE_REFRESH)
      if (hasRefresh) await Promise.all(promises)
    } catch (err) {
      removeAccessToken()
      this.clearAuth()
    }
  }

  @Action
  async signOut(): Promise<void> {
    await $api.auth.signOut()
    this.clearAuth()
  }

  @Action
  clearAuth(): void {
    this.clearAuthState()
    deleteModel(JWT_KEY)
    accountsStore.setAccount(null)
    scopesStore.clearScopes()
  }
}
