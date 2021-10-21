import { Route } from 'vue-router/types'
import { Action, Module, VuexModule, config, Mutation } from 'vuex-module-decorators'
import { $api } from '~/utils/api-accessor'
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
  ignoreAuth: boolean = false
  redirectTo: Route

  get isLoggedIn() {
    return !!this.accessToken
  }

  @Mutation
  setAccessToken(token: string) {
    this.accessToken = token
  }

  @Mutation
  clearAccessToken() {
    this.accessToken = null
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

    this.fetchRequiredDataOnLoggedIn()
  }

  @Action
  fetchRequiredDataOnLoggedIn(): Promise<void> {
    if (scopesStore.hasScopes) return Promise.resolve()
    return scopesStore.getScopes({ page: 1 })
  }

  @Action
  async signOut(): Promise<void> {
    await $api.auth.signOut()
    this.clearAuth()
  }

  @Action
  clearAuth(): void {
    this.clearAccessToken()
    accountsStore.setAccount(null)
    scopesStore.clearScopes()
  }
}
