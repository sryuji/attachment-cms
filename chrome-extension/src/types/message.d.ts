/**
   targetSite -> background -> acmsSite
 */
export type SelectScopeMessage = { type: 'SelectScope'; scopeId: number }

/**
  acmsSite -> background
*/
export type LatestReleaseMessage = {
  type: 'LatestRelease'
  scopeId: number
  releaseId: number
  limitedReleaseToken: string
}

/**
   background -> targetSite
 */
export type AttachLibMessage = {
  type: 'AttachLib'
  limitedReleaseToken: string
}

/**
   targetSite -> background -> acmsSite
 */
export type SearchContentMessage = {
  type: 'SearchContent'
  scopeId: number
  releaseId: number
  query: { path: string; isUpdated?: boolean }
}
/**
   acmsSite -> background
 */
export type SelectContentMessage = { type: 'SelectContent'; url: string; contentHistoryId: number }
/**
   acmsSite -> background -> targetSite
 */
export type SaveContentMessage = { type: 'SaveContent'; contentHistoryId: number }
/**
   acmsSite -> background
  targetSite -> background
 */
export type ConnectedMessage = { type: 'Connected' }
/**
   background -> targetSite
 */
export type RequestContentParamsMessage = { type: 'RequestContentParams' }
/**
   targetSite -> background
 */
export type ResponseContentParamsMessage = { type: 'ResponseContentParams'; selector: string; content?: string }

/**
   background -> acmsSite
 */
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
/**
   background -> acmsSite
 */
export type UpdateContentMessage = {
  type: 'UpdateContent'
  contentHistory: {
    id: number
    content: string
  }
}
