chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  document.dispatchEvent(new CustomEvent('RequestFromAcmsRuntime', { detail: message }))
  return true
})

window.addEventListener('SendToAcmsRuntime', function (ev: CustomEvent) {
  chrome.runtime.sendMessage(ev.detail)
} as EventListener)
