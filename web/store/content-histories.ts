import { Action, config, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import { Pager } from '~/types/attachment-cms-server/app/base/pager'
import { CreateContentHistoryForm } from '~/types/attachment-cms-server/app/content-histories/dto/create-content-history.dto'
import { UpdateContentHistoryForm } from '~/types/attachment-cms-server/app/content-histories/dto/update-content-history.dto'
import { ContentHistory } from '~/types/attachment-cms-server/db/entity/content-history.entity'
import { $api } from '~/utils/api-accessor'

config.rawError = true

@Module({
  name: 'content-histories', // NOTE: ファイル名と一致させないと駄目
  stateFactory: true,
  namespaced: true,
})
export default class extends VuexModule {
  contentHistories: ContentHistory[] = []
  totalCount: number

  @Mutation
  setContentHistories(contentHistories: ContentHistory[]) {
    this.contentHistories = contentHistories
  }

  @Mutation
  cleanContentHistories() {
    this.contentHistories = []
  }

  @Mutation
  setContentHistory(data: ContentHistory): void {
    const record = this.contentHistories.find((r) => r.id === data.id)
    if (record) {
      Object.assign(record, data)
    } else {
      this.contentHistories.push(data)
    }
  }

  @Mutation
  setTotalCount(pager: Pager): void {
    this.totalCount = pager.totalCount
  }

  @Mutation
  removeContentHistory(id: number): void {
    const index = this.contentHistories.findIndex((r) => r.id === id)
    if (index < 0) return
    this.contentHistories.splice(index, 1)
  }

  @Action
  async fetchContentHistories({
    releaseId,
    condition,
  }: {
    releaseId: number
    condition: { path: string; isUpdated: boolean }
  }): Promise<ContentHistory[]> {
    const { path, isUpdated } = condition
    const data = await $api.contentHistories.findAll({ releaseId, path, isUpdated, page: 1, per: 50 })
    this.setTotalCount(data.pager)
    this.setContentHistories(data.contentHistories)
    return data.contentHistories
  }

  @Action
  async createContentHistory(form: CreateContentHistoryForm): Promise<ContentHistory> {
    const data = await $api.contentHistories.create(form)
    this.setContentHistory(data.contentHistory)
    return data.contentHistory
  }

  @Action
  async updateContentHistory(form: UpdateContentHistoryForm): Promise<ContentHistory> {
    const data = await $api.contentHistories.update(form)
    this.setContentHistory(data.contentHistory)
    return data.contentHistory
  }

  @Action
  async deleteContentHistory(form: UpdateContentHistoryForm): Promise<void> {
    const id = form.contentHistory.id
    await $api.contentHistories.delete(id)
    this.removeContentHistory(id)
  }
}
