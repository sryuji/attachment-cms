export const ACCESS_TOKEN_COOKIE_KEY = 'AccessToken'
export const REDIRECT_TO = 'RedirectTo'
export const REFRESH_TOKEN_COOKIE_KEY = 'RefreshToken'

export type NotificationType = 'success' | 'error' | 'warning' | 'info'
export type ConfirmationType = { message?: string; title?: string; correctButton?: string; closeButton?: string }
