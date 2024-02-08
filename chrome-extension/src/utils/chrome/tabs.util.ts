export async function getCurrentTab() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
  return tab
}

export async function isExistTab(tabId: number): Promise<boolean> {
  if (!tabId) return false
  try {
    const tab = await chrome.tabs.get(tabId)
    return !!tab
  } catch (error) {
    return false
  }
}

export async function openTab(tabId: number, url: string): Promise<number> {
  if (!url.startsWith('http')) throw new Error('Need http/https protocol')

  const currentTab = await getCurrentTab()
  const hasTab = await isExistTab(tabId)
  if (hasTab && currentTab?.id !== tabId) {
    await chrome.tabs.update(tabId, { url, active: true, highlighted: true })
    return tabId
  } else {
    const tab = await chrome.tabs.create({ url, active: true })
    return tab.id
  }
}

export async function awaitConnected(tabId: number, timeout = 3000): Promise<boolean> {
  if (!tabId) throw new Error('No tabId.')
  const promise = new Promise<boolean>((resolve, reject) => {
    chrome.runtime.onMessage.addListener((message, sender: chrome.runtime.MessageSender, sendResponse) => {
      const senderTabId = sender?.tab?.id
      if (message?.type === 'Connected' && tabId === senderTabId) {
        resolve(true)
        sendResponse && sendResponse()
        return true
      }
      return false
    })
    setTimeout(() => resolve(false), timeout)
  })
  return promise
}

export async function activateTab(tabId: number) {
  await chrome.tabs.update(tabId, { active: true, highlighted: true })
}

export async function sendMessageToTab<M>(tabId: number, message: unknown): Promise<M> {
  if (!tabId || !(await isExistTab(tabId))) return Promise.reject(new Error(`No tab. tabId is ${tabId}`))
  const promise = new Promise<M>((resolve, reject) => {
    chrome.tabs.sendMessage(tabId, message, (response: M) => {
      resolve(response)
    })
  })
  return promise
}
