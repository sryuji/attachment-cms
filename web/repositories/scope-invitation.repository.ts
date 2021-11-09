import ApiRepository from './api.repository'
import { ScopeInvitationSerializer } from '~/types/attachment-cms-server/app/scopes/serializer/scope-invitation.serializer'
import { ScopeInvitationsSerializer } from '~/types/attachment-cms-server/app/scopes/serializer/scope-invitations.serializer'
import { ScopeInvitationForm } from '~/types/attachment-cms-server/app/scopes/dto/scope-invitation.form'

export class ScopeInvitationsRepository extends ApiRepository {
  findAll({
    scopeId,
    page = 1,
    per = 999,
  }: {
    scopeId: number
    page: number
    per: number
  }): Promise<ScopeInvitationsSerializer> {
    return this.get(`/scope-invitations`, { params: { scopeId, page, per } })
  }

  findOne(token: string): Promise<ScopeInvitationSerializer> {
    if (!token) throw new Error('Need token')
    return this.get(`/scope-invitations/${token}`)
  }

  create(form: ScopeInvitationForm): Promise<ScopeInvitationSerializer> {
    return this.post(`/scope-invitations`, form)
  }

  join(token: string): Promise<ScopeInvitationSerializer> {
    if (!token) throw new Error('Need token')
    return this.post(`/scope-invitations/${token}/join`, {})
  }

  delete(id: number): Promise<void> {
    if (!id) throw new Error('Need id')
    return this.del(`/scope-invitations/${id}`)
  }
}
