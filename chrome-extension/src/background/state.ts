import { ACMS_STATE_ID } from './constants'

type StateType = {
  acmsSiteTabId: number
  targetSiteTabId: number
  scopeId: number
  releaseId: number
  limitedReleaseToken: string
}
type StateIdType = keyof StateType

class State {
  data: StateType

  constructor() {
    this.data = {
      acmsSiteTabId: null,
      targetSiteTabId: null,
      scopeId: null,
      releaseId: null,
      limitedReleaseToken: '',
    }
  }

  async load() {
    const saved = await chrome.storage.local.get(ACMS_STATE_ID)
    Object.assign(this.data, saved)
  }

  async save(data: Partial<StateType>) {
    if (data) Object.assign(this.data, data)
    await chrome.storage.local.set({ [ACMS_STATE_ID]: this.data })
  }

  set(id: StateIdType, value: StateType[StateIdType]) {
    // @ts-expect-error https://zenn.dev/pentamania/articles/ts-index-signature-assign-becomes-never
    this.data[id] = value
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pick(id: StateIdType): any {
    return this.data[id]
  }
}

export const state = new State()
