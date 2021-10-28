import { Action, config, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import { CreateReleaseForm, UpdateReleaseForm } from '~/types/attachment-cms-server/app/scopes/dto/release.dto'
import { Release } from '~/types/attachment-cms-server/db/entity/release.entity'
import { $api } from '~/utils/api-accessor'

config.rawError = true

@Module({
  name: 'releases',
  stateFactory: true,
  namespaced: true,
})
export default class extends VuexModule {
  releases: Release[] = []

  get getRelease() {
    return (id: number) => this.releases.find((r) => r.id === id)
  }

  get getLatestRelease() {
    // NOTE: 最新が1件目の想定
    return (scopeId: number) => this.releases.find((r) => r.scopeId === scopeId)
  }

  @Mutation
  setReleases(releases: Release[]) {
    this.releases = releases
  }

  @Mutation
  setRelease(data: Release): void {
    const record = this.releases.find((r) => r.id === data.id)
    if (record) {
      Object.assign(record, data)
    } else {
      this.releases.splice(0, 0, data)
    }
  }

  @Mutation
  removeRelease(id: number): void {
    const index = this.releases.findIndex((r) => r.id === id)
    if (index < 0) return
    this.releases.splice(index, 1)
  }

  @Action
  async fetchReleases({ page = 1, per = 20 }): Promise<Release[]> {
    const data = await $api.releases.findAll({ page, per })
    this.setReleases(data.releases)
    return data.releases
  }

  @Action
  async createRelease(form: CreateReleaseForm): Promise<Release> {
    const data = await $api.releases.create(form)
    this.setRelease(data.release)
    return data.release
  }

  @Action
  async updateRelease(form: UpdateReleaseForm): Promise<Release> {
    const data = await $api.releases.update(form)
    this.setRelease(data.release)
    return data.release
  }

  @Action
  async deleteRelease(id: number): Promise<void> {
    await $api.releases.delete(id)
    this.removeRelease(id)
  }
}
