export type OnclickFnType = (info: chrome.contextMenus.OnClickData, tab: chrome.tabs.Tab) => void

export class ContextMenus<ID extends string> {
  onclickFnMap: Record<string, OnclickFnType> = {}
  initializedIds: ID[] = []

  constructor() {
    // この問題の対策 https://qiita.com/MugeSo/items/e5307bda346c0bb8e22e
    chrome.contextMenus.onClicked.addListener((info, tab) => {
      const fn = this.onclickFnMap[info.menuItemId]
      if (!fn) return
      fn(info, tab)
    })
  }

  initialize(settings: (Partial<chrome.contextMenus.CreateProperties> & { id: ID; parentId: string })[]) {
    chrome.runtime.onInstalled.addListener(() => {
      // NOTE: 各menuは全て非同期で作られる. 子MenuのIDをinitializedIdsに格納する事で同期的に対応している
      settings.forEach((setting) => this.createMenu(setting))
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

  public addListener(id: ID, onclick: OnclickFnType) {
    this.onclickFnMap[id] = onclick
  }

  private createMenu(settings: Partial<chrome.contextMenus.CreateProperties> & { id: ID; parentId: string }) {
    if (settings.parentId === undefined) throw new Error('Required parentId. Set null for no parent.')
    if (settings.onclick) throw new Error('Do not set to onclick. You must use addListenr function.')
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
        enabled: settings.enabled !== false,
        onclick: null,
      },
      () => this.initializedIds.push(settings.id)
    )
  }
}
