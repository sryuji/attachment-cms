console.log('initialize content-script')
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('catch message on content-script', message)
  sendResponse && sendResponse()
  return true
})
