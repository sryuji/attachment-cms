import { ContextMenuChildId } from '../../constants/context-menu'

type OnclickFnType = (info: chrome.contextMenus.OnClickData, tab: chrome.tabs.Tab) => void

export class ContextMenus {
  rootId: string
  rootTitle: string
  onclickFnMap: Record<string, OnclickFnType>

  constructor(rootId: string, rootTitle: string) {
    this.rootId = rootId
    this.rootTitle = rootTitle
    this.onclickFnMap = {}
    // この問題の対策 https://qiita.com/MugeSo/items/e5307bda346c0bb8e22e
    chrome.contextMenus.onClicked.addListener((info, tab) => {
      const fn = this.onclickFnMap[info.menuItemId]
      if (!fn) return
      fn(info, tab)
    })
  }

  initialize(fn: () => void) {
    chrome.runtime.onInstalled.addListener(() => {
      this.createRootMenu()
      fn()
    })
  }

  public static enableContextMenu(id: ContextMenuChildId) {
    chrome.contextMenus.update(id, { enabled: true })
  }

  public static disableContextMenu(id: ContextMenuChildId) {
    chrome.contextMenus.update(id, { enabled: false })
  }

  public updateCallback(id: ContextMenuChildId, onclick: OnclickFnType) {
    this.onclickFnMap[id] = onclick
  }

  public createChildMenu(id: ContextMenuChildId, title: string, onclick: OnclickFnType) {
    this.onclickFnMap[id] = onclick
    chrome.contextMenus.create({
      id,
      parentId: this.rootId,
      title,
      contexts: ['all'],
      type: 'normal',
      onclick: null,
    })
  }

  private createRootMenu() {
    chrome.contextMenus.create({
      title: this.rootTitle,
      type: 'normal',
      contexts: ['all'],
      id: this.rootId,
    })
  }
}
