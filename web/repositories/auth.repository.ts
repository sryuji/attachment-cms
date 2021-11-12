import ApiRepository from './api.repository'
import { UnauthorizedError } from '~/utils/errors'
import { AccessTokenDto, generateAccessTokenCookie, removeAccessToken } from '~/services/authentication.helper'

export class AuthRepository extends ApiRepository {
  async refreshAccessToken(): Promise<AccessTokenDto> {
    const data = await this.get('/auth/refresh', {}, { attemptRefreshToken: false })
    if (!data || !data.accessToken) throw new UnauthorizedError()

    generateAccessTokenCookie(data)
    return data
  }

  async signOut(): Promise<void> {
    removeAccessToken()
    await this.del('/auth')
  }
}
