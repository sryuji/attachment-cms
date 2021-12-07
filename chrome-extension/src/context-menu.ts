import { ContextMenuChildId, CONTEXT_MENU_ROOT_ID } from './constants/context-menu'
import { AddContentMessage, MoveReleaseScreenMessage, SelectScopeMessage } from './utils/chrome/tab-message'

type OnclickFnType = (info: chrome.contextMenus.OnClickData, tab: chrome.tabs.Tab) => void

export class ContextMenus {
  onclickFnMap: Record<string, OnclickFnType>

  constructor() {
    this.onclickFnMap = {}
    // この問題の対策 https://qiita.com/MugeSo/items/e5307bda346c0bb8e22e
    chrome.contextMenus.onClicked.addListener((info, tab) => {
      const fn = this.onclickFnMap[info.menuItemId]
      if (!fn) return
      fn(info, tab)
    })
  }

  initialize() {
    chrome.runtime.onInstalled.addListener(() => {
      chrome.contextMenus.create({
        title: 'attachment CMS',
        type: 'normal',
        contexts: ['all'],
        id: CONTEXT_MENU_ROOT_ID,
      })
      this.createChildMenu('acms-contextmenu-select-scope', 'Projectの選択', (info, tab) =>
        new SelectScopeMessage().send(tab)
      )
      this.createChildMenu('acms-contextmenu-add-content', 'コンテンツの追加', (info, tab) =>
        new AddContentMessage().send(tab)
      )
      this.createChildMenu('acms-contextmenu-move-release-screen', 'リリース画面を表示', (info, tab) =>
        new MoveReleaseScreenMessage().send(tab)
      )
    })
  }

  public static enableContextMenu(id: ContextMenuChildId) {
    chrome.contextMenus.update(id, { enabled: true })
  }

  public static disableContextMenu(id: ContextMenuChildId) {
    chrome.contextMenus.update(id, { enabled: false })
  }

  private createChildMenu(id: ContextMenuChildId, title: string, onclick: OnclickFnType) {
    this.onclickFnMap[id] = onclick
    chrome.contextMenus.create({
      id,
      parentId: CONTEXT_MENU_ROOT_ID,
      title,
      contexts: ['all'],
      type: 'normal',
      onclick: null,
    })
  }
}
