import { State } from '../utils/chrome/state'
import { ACMS_STATE_STORAGE_KEY } from './constants'

const data = {
  enableOrigins: [] as string[],
  acmsSiteTabId: null as number,
  targetSiteTabId: null as number,
  scopeId: null as number,
  releaseId: null as number,
  limitedReleaseToken: '',
}
export type StateType = typeof data

class LocalState extends State<StateType> {
  constructor() {
    super(ACMS_STATE_STORAGE_KEY)
    this.data = data
  }
}

export const state = new LocalState()
