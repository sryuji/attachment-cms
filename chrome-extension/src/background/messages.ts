import { sendMessageToTab } from '../utils/chrome/tabs.util'
import { state } from './state'

class Messages {
  get targetSiteTabId(): number {
    return state.pick('targetSiteTabId')
  }

  listen() {
    chrome.runtime.onMessage.addListener(async (message, sender: chrome.runtime.MessageSender, sendResponse) => {
      switch (message.type) {
        case 'SelectScope':
          state.save({ scopeId: message.scopeId, acmsSiteTabId: sender.tab.id })
          break
        case 'SelectRelease':
          state.save({
            acmsSiteTabId: sender.tab.id,
            scopeId: message.scopeId,
            releaseId: message.releaseId,
            limitedReleaseToken: message.limitedReleaseToken,
          })
          break
        case 'SelectContent':
          state.save({ acmsSiteTabId: sender.tab.id })
          if (this.targetSiteTabId) await sendMessageToTab(this.targetSiteTabId, message)
          break
        case 'SaveContent':
          state.save({ acmsSiteTabId: sender.tab.id })
          if (this.targetSiteTabId) await sendMessageToTab(this.targetSiteTabId, message)
          break
      }
      sendResponse && sendResponse()
      return true
    })
  }
}

export const messages = new Messages()
