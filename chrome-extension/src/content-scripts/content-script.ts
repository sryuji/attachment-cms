import { attachLib, getLoadedStatus } from './library'

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message?.type === 'AttachLib') {
    attachLib(message.limitedReleaseToken)
  } else if (['SaveContent', 'LoadContent'].includes(message?.type)) {
    window.location.reload()
  } else {
    document.dispatchEvent(new CustomEvent('RequestFromAcmsRuntime', { detail: message }))
  }
  sendResponse && sendResponse()
  return true
})

window.addEventListener('SendToAcmsRuntime', function (ev: CustomEvent) {
  chrome.runtime.sendMessage(ev.detail)
} as EventListener)

// NOTE: 既にextensionからattachLibされているケースは、再load時に自動で読み込ませる
if (typeof sessionStorage !== 'undefined' && getLoadedStatus() === 'extension') {
  attachLib(null, true)
}
