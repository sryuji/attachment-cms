import ApiRepository, { FindAllRequestParams } from './api.repository'
import { ContentHistoriesSerializer } from '~/types/attachment-cms-server/app/content-histories/serializer/content-histories.serializer'
import { ContentHistorySerializer } from '~/types/attachment-cms-server/app/content-histories/serializer/content-history.serializer'
import { UpdateContentHistoryForm } from '~/types/attachment-cms-server/app/content-histories/dto/update-content-history.dto'
import { CreateContentHistoryForm } from '~/types/attachment-cms-server/app/content-histories/dto/create-content-history.dto'

export class ContentHistoriesRepository extends ApiRepository {
  findAll({ page, per }: FindAllRequestParams): Promise<ContentHistoriesSerializer> {
    page = page || 1
    per = per || 20
    return this.get(`/content-histories`, { params: { page, per } })
  }

  findOne(id: number): Promise<ContentHistorySerializer> {
    return this.get(`/content-histories/${id}`)
  }

  create(form: CreateContentHistoryForm): Promise<ContentHistorySerializer> {
    return this.post(`/content-histories`, form)
  }

  update(form: UpdateContentHistoryForm): Promise<ContentHistorySerializer> {
    const id = form.contentHistory.id
    return this.patch(`/content-histories/${id}`, form)
  }

  delete(id: number): Promise<void> {
    return this.del(`/content-histories/${id}`)
  }
}
