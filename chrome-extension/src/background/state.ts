import { ACMS_STATE_ID } from './constants'

export type StateType = {
  acmsSiteTabId: number
  targetSiteTabId: number
  scopeId: number
  releaseId: number
  limitedReleaseToken: string
}
export type StateIdType = keyof StateType
export type ProxyCallback = (value: StateType[StateIdType], oldValue: StateType[StateIdType]) => void

class State {
  private data: StateType
  private proxyMap: Record<StateIdType, ProxyCallback>

  constructor() {
    this.data = {
      acmsSiteTabId: null,
      targetSiteTabId: null,
      scopeId: null,
      releaseId: null,
      limitedReleaseToken: '',
    }
    this.proxyMap = {} as typeof this.proxyMap
  }

  async load() {
    const saved = await chrome.storage.local.get(ACMS_STATE_ID)
    Object.assign(this.data, saved)
  }

  async save(data: Partial<StateType>) {
    if (data) {
      Object.keys(data).forEach((key) => {
        // @ts-expect-error Partial<StateType>を解決できない
        this.set(key as StateIdType, data[key] as StateType[StateIdType])
      })
    }
    await chrome.storage.local.set({ [ACMS_STATE_ID]: this.data })
  }

  set(id: StateIdType, value: StateType[StateIdType]) {
    const oldValue = this.data[id]
    // @ts-expect-error https://zenn.dev/pentamania/articles/ts-index-signature-assign-becomes-never
    this.data[id] = value
    this.proxyMap[id] && this.proxyMap[id](value, oldValue)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pick(id: StateIdType): any {
    return this.data[id]
  }

  addSetListener(id: StateIdType, listener: ProxyCallback) {
    listener(this.data[id], undefined)
    this.proxyMap[id] = (value, oldValue) => {
      if (value === oldValue) return
      listener(value, oldValue)
    }
  }
}

export const state = new State()
