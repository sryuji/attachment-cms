import { attachLib, getLoadedStatus } from './library'

if (typeof sessionStorage !== 'undefined') {
  sessionStorage.setItem('acmsExtension', 'use')

  // NOTE: 既にextensionからattachLibされているケースは、再load時に自動で読み込ませる
  if (getLoadedStatus() === 'extension') attachLib(null, true)

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message?.type === 'AttachLib') {
      attachLib(message.limitedReleaseToken)
    } else if (['SaveContent', 'LoadContent'].includes(message?.type)) {
      window.location.reload()
    } else {
      window.dispatchEvent(new CustomEvent('RequestFromAcmsRuntime', { detail: message }))
    }
    sendResponse && sendResponse()
    return true
  })

  window.addEventListener('SendToAcmsRuntime', function (ev: CustomEvent) {
    chrome.runtime.sendMessage(ev.detail)
  } as EventListener)
}
