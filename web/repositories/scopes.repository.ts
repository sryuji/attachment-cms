import ApiRepository from './api.repository'
import { ScopeSerializer } from '~/types/attachment-cms-server/app/scopes/serializer/scope.serializer'
import { ScopeForm } from '~/types/attachment-cms-server/app/scopes/dto/scope.dto'
import { ScopesSerializer } from '~/types/attachment-cms-server/app/scopes/serializer/scopes.serializer'

export type FindAllRequestParams = { page?: number; per?: number; domain?: string }

export class ScopesRepository extends ApiRepository {
  findAll({ page, per, domain }: FindAllRequestParams): Promise<ScopesSerializer> {
    page = page || 1
    per = per || 20
    return this.get(`/scopes`, { params: { page, per, domain } })
  }

  findOne(id: number): Promise<ScopeSerializer> {
    return this.get(`/scopes/${id}`)
  }

  create(form: ScopeForm): Promise<ScopeSerializer> {
    return this.post(`/scopes`, form)
  }

  update(form: ScopeForm): Promise<ScopeSerializer> {
    const id = form.scope.id
    return this.patch(`/scopes/${id}`, form)
  }

  delete(id: number): Promise<void> {
    return this.del(`/scopes/${id}`)
  }
}
