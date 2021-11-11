// LocalStorage
export const REDIRECT_TO = 'RedirectTo'
export const INVITATION_KEY = 'Invitation'

// Cookie
export const ACCESS_TOKEN_COOKIE_KEY = 'AccessToken'
export const REFRESH_TOKEN_COOKIE_KEY = 'RefreshToken'

// Response Header
export const AUTH_ACCESS_TOKEN_HEADER = 'X-Auth-AccessToken'.toLowerCase()

export type NotificationType = 'success' | 'error' | 'warning' | 'info'
export type ConfirmationType = { message?: string; title?: string; correctButton?: string; closeButton?: string }
