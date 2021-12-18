export type SelectScopeMessage = { type: 'SelectScope'; scopeId: number }

export type LatestReleaseMessage = {
  type: 'LatestRelease'
  scopeId: number
  releaseId: number
  limitedReleaseToken: string
}
export type AttachLibMessage = {
  type: 'AttachLib'
  limitedReleaseToken: string
}

export type SearchContentMessage = {
  type: 'SearchContent'
  scopeId: number
  releaseId: number
  query: { path: string; isUpdated?: boolean }
}
export type SelectContentMessage = { type: 'SelectContent'; url: string; contentHistoryId: number }
export type SaveContentMessage = { type: 'SaveContent' }

export type CreateContentMessage = {
  type: 'CreateContent'
  contentHistory: {
    scopeId: number
    releaseId: number
    path: string
    selector: string
    content: string
  }
}
export type UpdateContentMessage = {
  type: 'UpdateContent'
  contentHistory: {
    id: number
    content: string
  }
}
