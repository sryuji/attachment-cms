import ApiRepository from './api.repository'
import {
  CreateReleaseForm,
  PublishReleaseForm,
  UpdateReleaseForm,
} from '~/types/attachment-cms-server/app/scopes/dto/release.dto'
import { ReleaseSerializer } from '~/types/attachment-cms-server/app/scopes/serializer/release.serializer'
import { ReleasesSerializer } from '~/types/attachment-cms-server/app/scopes/serializer/releases.serializer'

export class ReleasesRepository extends ApiRepository {
  findAll({ page = 1, per = 20 }): Promise<ReleasesSerializer> {
    return this.get(`/releases`, { params: { page, per } })
  }

  findOne(id: number): Promise<ReleaseSerializer> {
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
