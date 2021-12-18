import { isNotUndefined } from '../object'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class State<S extends Record<string, any>> {
  protected data: S
  protected proxyMap: Record<keyof S, (value: S[keyof S], oldValue: S[keyof S]) => void>
  protected storageKey: string
  private storageFns = chrome.storage.local

  constructor(storageKey: string, sync?: boolean) {
    this.storageKey = storageKey
    this.data = {} as S
    this.proxyMap = {} as typeof this.proxyMap
    if (sync) this.storageFns = chrome.storage.sync
  }

  async load() {
    if (!this.storageKey) throw new Error('No storage Key')
    const storage = await this.storageFns.get(this.storageKey)
    const values = storage && storage[this.storageKey]
    if (!values) return
    Object.keys(values).forEach((key: keyof S) => isNotUndefined(values[key]) && this.set(key, values[key]))
  }

  async save(values: Partial<S>) {
    if (values) {
      Object.keys(values).forEach((key: keyof S) => isNotUndefined(values[key]) && this.set(key, values[key]))
    }
    await this.storageFns.set({ [this.storageKey]: this.data })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pick(id: keyof S): any {
    return this.data[id]
  }

  addStateListener(id: keyof S, listener: (value: S[keyof S], oldValue: S[keyof S]) => void) {
    this.proxyMap[id] = (value: S[keyof S], oldValue: S[keyof S]) => {
      if (value !== oldValue) listener(value, oldValue)
    }
  }

  private set(id: keyof S, value: S[keyof S]) {
    const oldValue = this.data[id]
    this.data[id] = value
    this.proxyMap[id] && this.proxyMap[id](value, oldValue)
  }
}
