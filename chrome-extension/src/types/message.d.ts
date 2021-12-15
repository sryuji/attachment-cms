export type SelectScopeMessage = { type: 'SelectScopeMessage'; scopeId: number }

export type RequestReleaseMessage = {
  type: 'RequestReleaseMessage'
  scopeId: number
}
export type SelectReleaseMessage = {
  type: 'SelectReleaseMessage'
  scopeId: number
  releaseId: number
  limitedReleaseToken: string
}

export type SearchContentMessage = {
  type: 'SearchContentMessage'
  scopeId: number
  releaseId: number
}
export type SelectContentMessage = { type: 'SelectContentMessage'; contentHistoryId: number }
export type SaveContentMessage = { type: 'SaveContentMessage' }
