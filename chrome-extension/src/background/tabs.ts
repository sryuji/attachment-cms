import { AttachLibMessage } from '../types/message'
import { openTab, sendMessageToTab } from '../utils/chrome/tabs.util'
import { getOrigin } from '../utils/url'
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

  get targetSiteTabId(): number {
    return state.pick('targetSiteTabId')
  }

  set targetSiteTabId(tabId: number) {
    if (!tabId) throw new Error(`tabId is ${tabId}`)
    state.save({ targetSiteTabId: tabId })
  }

  async openAcmsSite() {
    this.acmsSiteTabId = await openTab(this.acmsSiteTabId, resolveContentUrl())
  }

  listenOnUpdated() {
    chrome.tabs.onUpdated.addListener((tabId: number, changeInfo: chrome.tabs.TabChangeInfo, tab: chrome.tabs.Tab) => {
      console.log(`listenOnUpdated`, tab.url)
      this.requestAttachLib(tab)
    })
  }

  async requestAttachLib(tab: chrome.tabs.Tab): Promise<boolean> {
    const origin = getOrigin(tab.url)
    const enables = state.pick('enableOrigins')
    if (!origin || !enables.includes(origin)) return false
    const limitedReleaseToken = state.pick('limitedReleaseToken')
    if (!limitedReleaseToken) return false

    const message: AttachLibMessage = { type: 'AttachLib', limitedReleaseToken }
    await sendMessageToTab(tab.id, message)
    return true
  }
}

export const tabs = new Tabs()
