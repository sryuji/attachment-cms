import { ACMS_SITE_URL, CONTEXT_MENU_ROOT_ID, CONTEXT_MENU_ROOT_TITLE } from './background/constants'
import { resolveContentUrl } from './background/url-handler'
import { ContextMenus } from './background/context-menus'
import { openTab, sendMessageToTab } from './utils/chrome/tabs.util'
import { state } from './background/state'

state.load()
state.addSetListener('scopeId', (value, oldValue) => {
  if (value) {
    ContextMenus.enableContextMenu('acms-contextmenu-contents-list')
  } else {
    ContextMenus.disableContextMenu('acms-contextmenu-contents-list')
  }
})
state.addSetListener('releaseId', (value, oldValue) => {
  if (value) {
    ContextMenus.enableContextMenu('acms-contextmenu-add-content')
    ContextMenus.enableContextMenu('acms-contextmenu-edit-content')
  } else {
    ContextMenus.disableContextMenu('acms-contextmenu-add-content')
    ContextMenus.disableContextMenu('acms-contextmenu-edit-content')
  }
})

const contextMenus = new ContextMenus(CONTEXT_MENU_ROOT_ID, CONTEXT_MENU_ROOT_TITLE)
contextMenus.initialize([
  { id: 'acms-contextmenu-select-scope', title: 'Projectの選択' },
  { id: 'acms-contextmenu-contents-list', title: 'コンテンツの一覧' },
  { id: 'acms-contextmenu-add-content', title: 'Click先にコンテンツを追加' },
  { id: 'acms-contextmenu-edit-content', title: 'Click先のコンテンツを編集' },
])
contextMenus.addListener('acms-contextmenu-select-scope', async (info, tab) => {
  state.save({ targetSiteTabId: tab.id })
  await openTab(state.pick('acmsSiteTabId'), `${ACMS_SITE_URL}/scopes`)
})
contextMenus.addListener('acms-contextmenu-contents-list', async (info, tab) => {
  state.save({ targetSiteTabId: tab.id })
  await openTab(state.pick('acmsSiteTabId'), resolveContentUrl(state.pick('scopeId'), state.pick('releaseId')))
  sendMessageToTab(state.pick('acmsSiteTabId'), { query: '' })
})
contextMenus.addListener('acms-contextmenu-add-content', async (info, tab) => {
  state.save({ targetSiteTabId: tab.id })
  await openTab(state.pick('acmsSiteTabId'), resolveContentUrl(state.pick('scopeId'), state.pick('releaseId')))
  sendMessageToTab(state.pick('acmsSiteTabId'), { selector: '' })
})
contextMenus.addListener('acms-contextmenu-edit-content', async (info, tab) => {
  state.save({ targetSiteTabId: tab.id })
  await openTab(state.pick('acmsSiteTabId'), resolveContentUrl(state.pick('scopeId'), state.pick('releaseId')))
  sendMessageToTab(state.pick('acmsSiteTabId'), { contentHistoryId: 0 })
})

// From content_script
chrome.runtime.onMessage.addListener((message, sender: chrome.runtime.MessageSender, sendResponse) => {
  if (sender.tab) state.save({ acmsSiteTabId: sender.tab.id })

  switch (message.type) {
    case 'SelectScope':
      console.log(`SelectScope`, message)
      state.save({ scopeId: message.scopeId })
      break
    // case 'SelectRelease':
    //   state.scopeId = message.scopeId
    //   state.releaseId = message.releaseId
    //   state.limitedReleaseToken = message.limitedReleaseToken
    //   break
    // case 'SelectContent':
    //   const contentHistoryId = message.contentHistoryId
    //   // TODO: scroll
    //   break
    // case 'SaveContent':
    //   // TODO: reload
    //   break
  }
  return true
})
