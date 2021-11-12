import Cookies from 'universal-cookie'
import { CookieSetOptions } from 'universal-cookie/cjs'
import { Route, RouteMeta } from 'vue-router/types'
import { IncomingMessage } from 'connect'
import { ACCESS_TOKEN_COOKIE_KEY } from './constants'
import { authStore } from '~/store'

export function setIgnoreAuth(route: Route) {
  const needAuth = route.meta.reduce((auth: boolean | undefined, meta: RouteMeta) => {
    if (meta.auth === undefined) return auth
    if (typeof meta.auth === 'boolean') return meta.auth
    return auth
  }, true)
  authStore.setIgnoreAuth(!needAuth)
}

export type AccessTokenDto = {
  accessToken: string
  accessTokenMaxAge: number
}

/**
 * このCookieは、Nuxt.jsで認証時のSSRの処理を行う場合に必要となるため、LocalStorageでなくcookie管理しています
 * @param {AccessTokenDto} data
 */
export function generateAccessTokenCookie(data: AccessTokenDto): void {
  const cookies = new Cookies()
  const cookieOptions: CookieSetOptions = {
    path: '/',
    maxAge: data.accessTokenMaxAge,
    sameSite: 'strict',
    secure: location.protocol === 'https:',
  }
  cookies.set(ACCESS_TOKEN_COOKIE_KEY, data.accessToken, cookieOptions)
}

/**
 * AccessTokenをauth storeにstore
 * @param {IncomingMessage} req
 * @returns {boolean} accessTokenの有無
 */
export function restoreAccessToken(req?: IncomingMessage): boolean {
  const cookies = req ? new Cookies(req.headers.cookie) : new Cookies()
  const accessToken: string = cookies.get(ACCESS_TOKEN_COOKIE_KEY) || null
  authStore.setAccessToken(accessToken)
  return !!accessToken
}

export function removeAccessToken(): void {
  const cookies = new Cookies()
  const cookieOptions: CookieSetOptions = {
    path: '/',
    secure: location.protocol === 'https:',
  }
  cookies.remove(ACCESS_TOKEN_COOKIE_KEY, cookieOptions)
}
