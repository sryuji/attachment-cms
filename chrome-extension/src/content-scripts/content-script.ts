chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  sendResponse && sendResponse()
  return true
})
