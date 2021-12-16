import { State } from '../utils/chrome/state'
import { ACMS_STATE_STORAGE_KEY } from './constants'

export type StateType = {
  acmsSiteTabId: number
  targetSiteTabId: number
  scopeId: number
  releaseId: number
  limitedReleaseToken: string
}

class LocalState extends State<StateType> {
  constructor() {
    super(ACMS_STATE_STORAGE_KEY)
  }
}

export const state = new LocalState()
