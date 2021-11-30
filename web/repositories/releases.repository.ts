import ApiRepository from './api.repository'
import {
  CreateReleaseForm,
  PublishReleaseForm,
  UpdateReleaseForm,
} from '~/types/attachment-cms-server/app/scopes/dto/release.dto'
import { ReleaseSerializer } from '~/types/attachment-cms-server/app/scopes/serializer/release.serializer'
import { ReleasesSerializer } from '~/types/attachment-cms-server/app/scopes/serializer/releases.serializer'
import { ReleaseWithPagerSerializer } from '~/types/attachment-cms-server/app/scopes/serializer/release-with-pager.serializer'
import { ClientValidationError } from '~/utils/errors'

export class ReleasesRepository extends ApiRepository {
  findAll({ scopeId, page = 1, per = 1 }: { scopeId: number; page: number; per: number }): Promise<ReleasesSerializer> {
    return this.get(`/releases`, { params: { scopeId, page, per } })
  }

  findLatest(scopeId: number): Promise<ReleaseSerializer> {
    if (!scopeId) throw new ClientValidationError({ message: 'Need scopeId' })
    return this.get(`/releases/latest`, { params: { scopeId } })
  }

  findOne(id: number): Promise<ReleaseWithPagerSerializer> {
    if (!id) throw new ClientValidationError({ message: 'Need id' })
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

  rollback(id: number): Promise<ReleaseSerializer> {
    if (!id) throw new Error('Need id')
    return this.patch(`/releases/${id}/rollback`, {})
  }

  delete(id: number): Promise<void> {
    if (!id) throw new Error('Need id')
    return this.del(`/releases/${id}`)
  }
}
