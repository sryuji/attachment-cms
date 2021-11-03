import ApiRepository from './api.repository'
import {
  CreateReleaseForm,
  PublishReleaseForm,
  UpdateReleaseForm,
} from '~/types/attachment-cms-server/app/scopes/dto/release.dto'
import { ReleaseSerializer } from '~/types/attachment-cms-server/app/scopes/serializer/release.serializer'
import { ReleasesSerializer } from '~/types/attachment-cms-server/app/scopes/serializer/releases.serializer'
import { ReleaseWithPagerSerializer } from '~/types/attachment-cms-server/app/scopes/serializer/release-with-pager.serializer'

export class ReleasesRepository extends ApiRepository {
  findAll({ scopeId, page = 1, per = 1 }: { scopeId: number; page: number; per: number }): Promise<ReleasesSerializer> {
    return this.get(`/releases`, { params: { scopeId, page, per } })
  }

  findLatest(scopeId: number): Promise<ReleaseSerializer> {
    if (!scopeId) throw new Error('Need scopeId')
    return this.get(`/releases/latest`, { params: { scopeId } })
  }

  findOne(id: number): Promise<ReleaseWithPagerSerializer> {
    if (!id) throw new Error('Need id')
    return this.get(`/releases/${id}`)
  }

  create(form: CreateReleaseForm): Promise<ReleaseSerializer> {
    return this.post(`/releases`, form)
  }

  update(form: UpdateReleaseForm): Promise<ReleaseSerializer> {
    const id = form.release.id
    if (!id) throw new Error('Need id')
    return this.patch(`/releases/${id}`, form)
  }

  publish(form: PublishReleaseForm): Promise<ReleaseSerializer> {
    const id = form.release.id
    if (!id) throw new Error('Need id')
    return this.patch(`/releases/${id}/publish`, form)
  }

  delete(id: number): Promise<void> {
    if (!id) throw new Error('Need id')
    return this.del(`/releases/${id}`)
  }
}
