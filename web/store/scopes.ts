import { Action, Mutation, Module, VuexModule, config } from 'vuex-module-decorators'
import { FindAllRequestParams } from '~/repositories/scopes.repository'
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
  setScope(data: Scope) {
    const scope = this.scopes.find((r) => r.id === data.id)
    Object.assign(scope, data)
  }

  @Action
  async getScopes({ page, per, domain }: FindAllRequestParams): Promise<void> {
    const data = await $api.scopes.findAll({ page, per, domain })
    this.setScopes(data.scopes)
  }

  @Action
  async updateScope(form: ScopeForm): Promise<void> {
    const data = await $api.scopes.update(form)
    this.setScope(data.scope)
  }
}
