import ApiRepository from './api.repository'
import { deleteModel, saveProperty } from '~/utils/local-storage'
import { UnauthorizedError } from '~/utils/errors'
import { JWT_STORAGE_KEY } from '~/services/constants'

export class AuthRepository extends ApiRepository {
  async refreshAccessToken(): Promise<Record<'accessToken', string>> {
    const data = await this.get('/auth/refresh', {}, { attemptRefreshToken: false })
    if (!data || !data.accessToken) throw new UnauthorizedError()
    saveProperty(JWT_STORAGE_KEY, 'accessToken', data.accessToken)
    return data
  }

  async signOut(): Promise<void> {
    deleteModel(JWT_STORAGE_KEY)
    await this.del('/auth')
  }
}
