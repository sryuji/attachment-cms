import ApiRepository from './api.repository'
import { ScopeSerializer } from '~/types/attachment-cms-server/app/scopes/serializer/scope.serializer'
import { ScopeForm } from '~/types/attachment-cms-server/app/scopes/dto/scope.dto'
import { ScopesSerializer } from '~/types/attachment-cms-server/app/scopes/serializer/scopes.serializer'
import { ClientValidationError } from '~/utils/errors'

export class ScopesRepository extends ApiRepository {
  findAll({ page = 1, per = 999 }): Promise<ScopesSerializer> {
    return this.get(`/scopes`, { params: { page, per } })
  }

  findOne(id: number): Promise<ScopeSerializer> {
    if (!id) throw new ClientValidationError({ message: 'Need id' })
    return this.get(`/scopes/${id}`)
  }

  create(form: ScopeForm): Promise<ScopeSerializer> {
    return this.post(`/scopes`, form)
  }

  update(form: ScopeForm): Promise<ScopeSerializer> {
    const id = form.scope.id
    if (!id) throw new Error('Need id')
    return this.patch(`/scopes/${id}`, form)
  }

  delete(id: number): Promise<void> {
    if (!id) throw new Error('Need id')
    return this.del(`/scopes/${id}`)
  }
}
