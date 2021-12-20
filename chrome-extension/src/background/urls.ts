import { state } from './state'

// export const ACMS_SITE_URL = 'https://attachment-cms.dev'
export const ACMS_SITE_URL = 'http://localhost:3001'

export const SCOPES_URL = `${ACMS_SITE_URL}/scopes`

export function resolveContentUrl(path?: string, scopeId?: number, releaseId?: number) {
  scopeId ||= state.pick('scopeId')
  releaseId ||= state.pick('releaseId')
  let url = `${ACMS_SITE_URL}/scopes/${scopeId}/releases`
  if (releaseId) url = `${url}/${releaseId}`
  if (releaseId && path) url = `${url}?path=${path}`
  return url
}
