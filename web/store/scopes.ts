import { Action, Mutation, Module, VuexModule, config } from 'vuex-module-decorators'
import { ScopeForm } from '~/types/attachment-cms-server/app/scopes/dto/scope.dto'
import { Scope } from '~/types/attachment-cms-server/db/entity/scope.entity'
import { $api } from '~/utils/api-accessor'

config.rawError = true

@Module({
  name: 'scopes',
  stateFactory: true,
  namespaced: true,
})
export default class extends VuexModule {
  scopes: Scope[] = []

  @Mutation
  setScopes(scopes: Scope[]) {
    this.scopes = scopes
  }

  @Mutation
  clearScopes() {
    this.scopes = []
  }

  @Mutation
  setScope(data: Scope): void {
    const scope = this.scopes.find((r) => r.id === data.id)
    if (scope) {
      Object.assign(scope, data)
    } else {
      this.scopes.push(data)
    }
  }

  get hasScopes() {
    return this.scopes.length > 0
  }

  get getScope() {
    return (id: number) => this.scopes.find((r) => r.id === id)
  }

  @Action
  async fetchScopes({ page = 1, per = 999 }): Promise<Scope[]> {
    const data = await $api.scopes.findAll({ page, per })
    this.setScopes(data.scopes)
    return data.scopes
  }

  @Action
  async createScope(form: ScopeForm): Promise<Scope> {
    const data = await $api.scopes.create(form)
    this.setScope(data.scope)
    return data.scope
  }

  @Action
  async updateScope(form: ScopeForm): Promise<Scope> {
    const data = await $api.scopes.update(form)
    this.setScope(data.scope)
    return data.scope
  }
}
