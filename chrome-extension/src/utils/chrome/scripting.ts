import { getCurrentTab } from './tabs'

async function executeScript(file: string, tab?: chrome.tabs.Tab) {
  tab ||= await getCurrentTab()
  chrome.scripting.executeScript({ target: { tabId: tab.id }, files: [file] })
}

export async function executeSelectScope(tab?: chrome.tabs.Tab) {
  await executeScript('js/select-scope.js', tab)
}

export async function executeAddContent(tab?: chrome.tabs.Tab) {
  await executeScript('js/add-content.js', tab)
}

export async function executeMoveReleaseScreen(tab?: chrome.tabs.Tab) {
  await executeScript('js/move-release-screen.js', tab)
}
