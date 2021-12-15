import { ContextMenuChildId } from './constants'

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

  initialize(settings: { id: ContextMenuChildId; title: string }[]) {
    chrome.runtime.onInstalled.addListener(() => {
      this.createRootMenu()
      // NOTE: callbackは `onInstalled`イベント関係なく、background.ts呼ばれたら初期化されるように分けて初期化
      settings.forEach((setting) => this.createChildMenu(setting.id, setting.title))
    })
  }

  public static enableContextMenu(id: ContextMenuChildId) {
    chrome.contextMenus.update(id, { enabled: true })
  }

  public static disableContextMenu(id: ContextMenuChildId) {
    chrome.contextMenus.update(id, { enabled: false })
  }

  public addListener(id: ContextMenuChildId, onclick: OnclickFnType) {
    this.onclickFnMap[id] = onclick
  }

  private createChildMenu(id: ContextMenuChildId, title: string) {
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
