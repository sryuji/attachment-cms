import { openTab } from '../utils/chrome/tabs.util'
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
}

export const tabs = new Tabs()
