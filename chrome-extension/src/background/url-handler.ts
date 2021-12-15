import { ACMS_SITE_URL } from './constants'

export function resolveContentUrl(scopeId: number, releaseId: number) {
  let url = `${ACMS_SITE_URL}/scopes/${scopeId}/releases`
  if (releaseId) url = `${url}/${releaseId}`
  return url
}
