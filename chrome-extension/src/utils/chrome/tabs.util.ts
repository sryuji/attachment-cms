export async function getCurrentTab() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
  return tab
}

export async function isExistTab(tabId: number): Promise<boolean> {
  try {
    const tab = await chrome.tabs.get(tabId)
    return !!tab
  } catch (error) {
    return false
  }
}

export async function openTab(tabId: number, url: string): Promise<number> {
  if (!url.startsWith('http')) throw new Error('Need http/https protocol')

  const hasTab = tabId && (await isExistTab(tabId))
  if (hasTab) {
    await chrome.tabs.update(tabId, { url: url || undefined, active: true, highlighted: true })
    return tabId
  } else {
    const tab = await chrome.tabs.create({ url, active: true })
    return tab.id
  }
}

export async function activateTab(tabId: number) {
  await chrome.tabs.update(tabId, { active: true, highlighted: true })
}

export async function sendMessageToTab(tabId: number, message: unknown) {
  if (!tabId || !(await isExistTab(tabId))) return Promise.reject(new Error(`No tab. tabId is ${tabId}`))
  const promise = new Promise((resolve, reject) => {
    chrome.tabs.sendMessage(tabId, message, (response) => {
      resolve(response)
    })
  })
  return promise
}
