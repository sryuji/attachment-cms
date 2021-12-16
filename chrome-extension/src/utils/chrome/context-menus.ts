export type OnclickFnType = (info: chrome.contextMenus.OnClickData, tab: chrome.tabs.Tab) => void

export class ContextMenus<ID extends string> {
  rootId: string
  rootTitle: string
  onclickFnMap: Record<string, OnclickFnType> = {}
  initializedIds: ID[] = []

  constructor(rootId: string, rootTitle: string) {
    this.rootId = rootId
    this.rootTitle = rootTitle
    // この問題の対策 https://qiita.com/MugeSo/items/e5307bda346c0bb8e22e
    chrome.contextMenus.onClicked.addListener((info, tab) => {
      const fn = this.onclickFnMap[info.menuItemId]
      if (!fn) return
      fn(info, tab)
    })
  }

  initialize(settings: (Partial<chrome.contextMenus.CreateProperties> & { id: ID })[]) {
    chrome.runtime.onInstalled.addListener(() => {
      // NOTE: 各menuは全て非同期で作られる. 子MenuのIDをinitializedIdsに格納する事で同期的に対応している
      this.createRootMenu()
      settings.forEach((setting) => this.createChildMenu(setting))
    })
  }

  public async enableContextMenu(id: ID) {
    if (!this.initializedIds.includes(id)) return
    await chrome.contextMenus.update(id, { enabled: true })
  }

  public async disableContextMenu(id: ID) {
    if (!this.initializedIds.includes(id)) return
    await chrome.contextMenus.update(id, { enabled: false })
  }

  public addListener(id: string, onclick: OnclickFnType) {
    this.onclickFnMap[id] = onclick
  }

  private createChildMenu(settings: Partial<chrome.contextMenus.CreateProperties> & { id: ID }) {
    // async
    chrome.contextMenus.create(
      {
        // default parameter
        contexts: ['all'],
        type: 'normal',
        // specified parameter
        ...settings,
        // force to override parameter
        id: settings.id,
        parentId: this.rootId,
        enabled: settings.enabled !== false,
        onclick: null,
      },
      () => this.initializedIds.push(settings.id)
    )
  }

  private createRootMenu() {
    // async
    chrome.contextMenus.create({
      title: this.rootTitle,
      type: 'normal',
      contexts: ['all'],
      id: this.rootId,
    })
  }
}
