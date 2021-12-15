export async function getCurrentTab() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
  return tab
}

export async function isExistTab(tabId: number): Promise<boolean> {
  const tab = await chrome.tabs.get(tabId)
  return !!tab
}

export async function openTab(tabId: number, url: string): Promise<number> {
  if (!url.startsWith('http')) throw new Error('Need http/https protocol')

  const hasTab = tabId && isExistTab(tabId)
  if (hasTab) {
    await chrome.tabs.update(tabId, { url: url || undefined, active: true, highlighted: true })
    return tabId
  } else {
    const tab = await chrome.tabs.create({ url, active: true })
    return tab.id
  }
}

export function sendMessageToTab(tabId: number, message: unknown) {
  if (!tabId) throw new Error('Bug. tabId is empty')
  const promise = new Promise((resolve, reject) => {
    chrome.tabs.sendMessage(tabId, message, (response) => {
      resolve(response)
    })
  })
  return promise
}
