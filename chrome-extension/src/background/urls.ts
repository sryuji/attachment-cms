// export const ACMS_SITE_URL = 'https://attachment-cms.dev'
export const ACMS_SITE_URL = 'http://localhost:3001'

export const SCOPES_URL = `${ACMS_SITE_URL}/scopes`

export function resolveContentUrl(scopeId: number, releaseId: number) {
  let url = `${ACMS_SITE_URL}/scopes/${scopeId}/releases`
  if (releaseId) url = `${url}/${releaseId}`
  return url
}
