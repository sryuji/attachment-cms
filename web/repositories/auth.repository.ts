import Cookies from 'universal-cookie'
import ApiRepository from './api.repository'
import { UnauthorizedError } from '~/utils/errors'
import { ACCESS_TOKEN_COOKIE_KEY } from '~/services/constants'
import { AccessTokenDto, generateAccessTokenCookie } from '~/services/authentication.helper'

export class AuthRepository extends ApiRepository {
  async refreshAccessToken(): Promise<AccessTokenDto> {
    const data = await this.get('/auth/refresh', {}, { attemptRefreshToken: false })
    if (!data || !data.accessToken) throw new UnauthorizedError()

    generateAccessTokenCookie(data)
    return data
  }

  async signOut(): Promise<void> {
    const cookies = new Cookies()
    cookies.remove(ACCESS_TOKEN_COOKIE_KEY)
    await this.del('/auth')
  }
}
