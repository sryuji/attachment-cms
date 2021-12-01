// LocalStorage
export const REDIRECT_TO = 'RedirectTo'
export const INVITATION_KEY = 'Invitation'
export const JWT_KEY = 'JWT'
export const JWT_AVAILABLE_REFRESH = 'available_refresh'

// Cookie
export const ACCESS_TOKEN_COOKIE_KEY = 'AccessToken'
export const REFRESH_TOKEN_COOKIE_KEY = 'RefreshToken'

// Response Header
export const AUTH_ACCESS_TOKEN_HEADER = 'X-Auth-AccessToken'.toLowerCase()

export type NotificationType = 'success' | 'error' | 'warning' | 'info'
export type ConfirmationStyleType = 'default' | 'error' | 'warning'
export type ConfirmationType = {
  message?: string
  title?: string
  correctButton?: string
  closeButton?: string
  style?: ConfirmationStyleType
}

export function attachmentUmdScript(token: string) {
  return `
&lt;link rel="preconnect" href="https://api.attachment-cms.dev" crossorigin&gt;
&lt;script type="text/javascript"&gt;
  window.AttachmentConfig = { token: "${token}" }
&lt;/script&gt;
&lt;script defer type="module" src="https://attachment-cms.dev/lib/attachment-cms-lib.umd.js"&gt;&lt;/script&gt;
  `
}
export function attachmentEsScript(token: string) {
  return `
import { AttachmentCMS } from 'https://attachment-cms.dev/lib/attachment-cms-lib.es.js'

new AttachmentCMS({
  token: "${token}",
}).run()
  `
}
