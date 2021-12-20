import { AttachLibMessage } from '../types/message'
import { openTab, sendMessageToTab } from '../utils/chrome/tabs.util'
import { state } from './state'
import { resolveContentUrl } from './urls'

class Tabs {
  get acmsSiteTabId(): number {
    return state.pick('acmsSiteTabId')
  }

  set acmsSiteTabId(tabId: number) {
    if (!tabId) throw new Error(`tabId is ${tabId}`)
    state.save({ acmsSiteTabId: tabId })
  }

  async openAcmsSite(path?: string) {
    this.acmsSiteTabId = await openTab(this.acmsSiteTabId, resolveContentUrl(path))
  }

  async requestAttachLib(tabId: number): Promise<boolean> {
    const limitedReleaseToken = state.pick('limitedReleaseToken')
    if (!tabId || !limitedReleaseToken) return false

    const message: AttachLibMessage = { type: 'AttachLib', limitedReleaseToken }
    await sendMessageToTab(tabId, message)
    return true
  }
}

export const tabs = new Tabs()
