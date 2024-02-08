import { elemToSelector } from '../utils/html'
import { attachLib, getLoadedStatus } from './library'

if (typeof sessionStorage !== 'undefined') {
  sessionStorage.setItem('acmsExtension', 'use')

  let contextmenuSelector: string = null
  window.addEventListener('contextmenu', (event: MouseEvent) => {
    contextmenuSelector = elemToSelector(event.target as HTMLElement)
    console.log(contextmenuSelector)
  })

  // NOTE: 既にextensionからattachLibされているケースは、再load時に自動で読み込ませる
  if (getLoadedStatus() === 'extension') attachLib(null, true)

  // WARNING: async不可
  // https://developer.mozilla.org/ja/docs/Mozilla/Add-ons/WebExtensions/API/runtime/onMessage#addlistener_%E3%81%AE%E6%A7%8B%E6%96%87
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message?.type === 'AttachLib') {
      attachLib(message.limitedReleaseToken)
      sendResponse && sendResponse()
    } else if (['SaveContent'].includes(message?.type)) {
      sendResponse && sendResponse()
      window.location.reload()
    } else if (['RequestContentParams'].includes(message?.type)) {
      sendResponse({ selector: contextmenuSelector })
      contextmenuSelector = null
    } else {
      window.dispatchEvent(new CustomEvent('RequestFromAcmsRuntime', { detail: message }))
      sendResponse && sendResponse()
    }
    return true
  })

  window.addEventListener('SendToAcmsRuntime', function (ev: CustomEvent) {
    chrome.runtime.sendMessage(ev.detail)
  } as EventListener)

  chrome.runtime.sendMessage({ type: 'Connected' })
}
