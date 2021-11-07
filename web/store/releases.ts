import { isAfter } from 'date-fns'
import { Action, config, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import { parseDate } from '~/plugins/filters/date'
import { Pager } from '~/types/attachment-cms-server/app/base/pager'
import {
  CreateReleaseForm,
  PublishReleaseForm,
  UpdateReleaseForm,
} from '~/types/attachment-cms-server/app/scopes/dto/release.dto'
import { Release } from '~/types/attachment-cms-server/db/entity/release.entity'
import { $api } from '~/utils/api-accessor'
import { contentHistoriesStore } from '~/utils/store-accessor'

config.rawError = true

@Module({
  name: 'releases',
  stateFactory: true,
  namespaced: true,
})
export default class extends VuexModule {
  releases: Release[] = []
  latestRelease: Release = null
  pager: Partial<Pager> = null

  get getRelease() {
    return (id: number) => this.releases.find((r) => r.id === id)
  }

  get page(): number {
    if (!this.pager) return null
    return this.pager.page
  }

  get offset(): number {
    if (!this.page) return null
    return (this.page - 1) * this.pager.per
  }

  get hasNextRelease(): boolean {
    if (!this.page) return null
    return this.pager.totalCount > this.offset + 1
  }

  get hasPrevRelease(): boolean {
    if (!this.page) return null
    return this.page > 1
  }

  @Mutation
  cleanReleases() {
    this.latestRelease = null
    this.releases = []
    this.pager = null
  }

  @Mutation
  setLatestRelease(release: Release) {
    this.latestRelease = release
  }

  @Mutation
  setPager(pager: Partial<Pager>) {
    this.pager = pager
  }

  @Mutation
  setRelease(data: Release): void {
    const record = this.releases.find((r) => r.id === data.id)
    if (record) {
      Object.assign(record, data)
    } else if (!data.releasedAt) {
      this.releases.splice(0, 0, data)
    } else {
      const index = this.releases.findIndex(
        (r) => r.releasedAt && isAfter(parseDate(data.releasedAt), parseDate(r.releasedAt))
      )
      if (index < 0) {
        this.releases.push(data)
      } else {
        this.releases.splice(index, 0, data)
      }
    }
  }

  @Mutation
  removeRelease(id: number): void {
    const index = this.releases.findIndex((r) => r.id === id)
    if (index < 0) return
    this.releases.splice(index, 1)
    if (this.latestRelease && this.latestRelease.id === id) this.latestRelease = null
  }

  @Action
  async fetchReleases({ scopeId, page }: { scopeId: number; page: number }): Promise<Release[]> {
    const data = await $api.releases.findAll({ scopeId, page, per: this.pager.per })
    this.setPager(data.pager)
    data.releases.forEach((r) => this.setRelease(r))
    return data.releases
  }

  @Action
  async fetchLatestRelease(scopeId: number): Promise<Release> {
    const data = await $api.releases.findLatest(scopeId)
    this.setLatestRelease(data.release)
    return data.release
  }

  @Action
  async fetchRelease(id: number): Promise<Release> {
    const data = await $api.releases.findOne(id)
    this.setPager(data.pager)
    this.setRelease(data.release)
    return data.release
  }

  @Action
  async createRelease(form: CreateReleaseForm): Promise<Release> {
    const data = await $api.releases.create(form)
    this.setRelease(data.release)
    this.setLatestRelease(data.release)
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
    const release = this.getRelease(id)
    if (!release) return
    await $api.releases.delete(id)
    this.removeRelease(id)
    await this.fetchLatestRelease(release.scopeId)
  }

  @Action
  async publishRelease(form: PublishReleaseForm): Promise<Release> {
    form.release.releasedAt = new Date()
    const data = await $api.releases.publish(form)
    this.setRelease(data.release)
    return data.release
  }

  @Action
  cleanOtherScope(scopeId: number): void {
    if (
      (this.latestRelease && this.latestRelease.scopeId !== scopeId) ||
      (this.releases.length > 0 && this.releases[0].scopeId !== scopeId)
    ) {
      this.cleanReleases()
      contentHistoriesStore.cleanContentHistories()
    }
  }
}
