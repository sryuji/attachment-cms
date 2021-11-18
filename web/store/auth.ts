import { Route } from 'vue-router/types'
import { Action, Module, VuexModule, config, Mutation } from 'vuex-module-decorators'
import { removeAccessToken } from '~/services/authentication.helper'
import { JWT_AVAILABLE_REFRESH, JWT_KEY } from '~/services/constants'
import { Scope } from '~/types/attachment-cms-server/db/entity/scope.entity'
import { $api } from '~/utils/api-accessor'
import { UnauthorizedError } from '~/utils/errors'
import { deleteModel, fetchProperty } from '~/utils/local-storage'
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
    const availableRefresh = fetchProperty(JWT_KEY, JWT_AVAILABLE_REFRESH)
    if (!availableRefresh) throw new UnauthorizedError()

    try {
      const data = await $api.auth.refreshAccessToken()
      this.setAccessToken(data.accessToken)
    } catch (err: any) {
      this.clearAuth()
      deleteModel(JWT_KEY)
      throw err
    }
  }

  @Action
  async fetchRequiredDataOnLoggedIn(): Promise<void> {
    if (!this.isLoggedIn) await this.refreshAccessToken()

    const promise1: Promise<Scope[] | void> = scopesStore.hasScopes ? Promise.resolve() : scopesStore.fetchScopes({})
    const promise2: Promise<void> = accountsStore.hasAccount ? Promise.resolve() : accountsStore.fetchAccount()
    await Promise.all([promise1, promise2])
  }

  @Action
  async signOut(): Promise<void> {
    await $api.auth.signOut()
    this.clearAuth()
    deleteModel(JWT_KEY)
  }

  @Action
  clearAuth(): void {
    this.clearAuthState()
    removeAccessToken()
    accountsStore.setAccount(null)
    scopesStore.clearScopes()
  }
}
