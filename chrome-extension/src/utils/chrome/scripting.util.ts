import { getCurrentTab } from './tabs.util'

export async function executeScript(file: string, tab?: chrome.tabs.Tab) {
  tab ||= await getCurrentTab()
  chrome.scripting.executeScript({ target: { tabId: tab.id }, files: [file] })
}
