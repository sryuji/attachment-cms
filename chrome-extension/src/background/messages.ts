import { openTab } from '../utils/chrome/tabs.util'
import { state } from './state'
import { tabs } from './tabs'

class Messages {
  get targetSiteTabId(): number {
    return state.pick('targetSiteTabId')
  }

  listen() {
    // WARNING: async不可
    // https://developer.mozilla.org/ja/docs/Mozilla/Add-ons/WebExtensions/API/runtime/onMessage#addlistener_%E3%81%AE%E6%A7%8B%E6%96%87
    chrome.runtime.onMessage.addListener((message, sender: chrome.runtime.MessageSender, sendResponse) => {
      switch (message.type) {
        case 'SelectScope':
          state.save({
            acmsSiteTabId: sender.tab.id,
            scopeId: message.scopeId,
            releaseId: null,
            limitedReleaseToken: null,
          })
          break
        case 'LatestRelease': {
          state
            .save({
              acmsSiteTabId: sender.tab.id,
              scopeId: message.scopeId,
              releaseId: message.releaseId,
              limitedReleaseToken: message.limitedReleaseToken,
            })
            .then(() => {
              return tabs.requestAttachLib(this.targetSiteTabId)
            })
          break
        }
        case 'SelectContent':
          state
            .save({
              acmsSiteTabId: sender.tab.id,
              scopeId: message.scopeId,
              releaseId: message.releaseId,
              limitedReleaseToken: message.limitedReleaseToken,
            })
            .then(() => {
              return openTab(this.targetSiteTabId, message.url)
            })
          break
        case 'SaveContent':
          state
            .save({
              acmsSiteTabId: sender.tab.id,
              scopeId: message.scopeId,
              releaseId: message.releaseId,
              limitedReleaseToken: message.limitedReleaseToken,
            })
            .then(() => {
              return openTab(this.targetSiteTabId, message.url)
            })
          break
        default:
          return false
      }
      sendResponse && sendResponse()
      return true
    })
  }
}

export const messages = new Messages()
