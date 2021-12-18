import { CreateContentMessage, SearchContentMessage } from '../types/message'
import { ContextMenus } from '../utils/chrome/context-menus'
import { openTab, sendMessageToTab } from '../utils/chrome/tabs.util'
import { ContextMenuChildId, CONTEXT_MENU_ROOT_ID, CONTEXT_MENU_ROOT_TITLE } from './constants'
import { state } from './state'
import { tabs } from './tabs'
import { SCOPES_URL } from './urls'

class Menus extends ContextMenus<ContextMenuChildId> {
  constructor() {
    super(CONTEXT_MENU_ROOT_ID, CONTEXT_MENU_ROOT_TITLE)
  }

  initialize() {
    this.createMenus()
    this.addClickListener()
    this.addStateListener()
  }

  private createMenus() {
    const releaseId = state.pick('releaseId')
    super.initialize([
      { id: 'acms-contextmenu-select-scope', title: 'Projectの選択', enabled: true },
      { id: 'acms-contextmenu-contents-list', title: 'コンテンツの一覧', enabled: !!state.pick('scopeId') },
      { id: 'acms-contextmenu-add-content', title: 'Click先にコンテンツを追加', enabled: !!releaseId },
      { id: 'acms-contextmenu-edit-content', title: 'Click先のコンテンツを編集', enabled: !!releaseId },
    ])
  }

  private addClickListener() {
    super.addListener('acms-contextmenu-select-scope', async (info, tab) => {
      state.save({ targetSiteTabId: tab.id })
      await openTab(state.pick('acmsSiteTabId'), SCOPES_URL)
    })
    super.addListener('acms-contextmenu-contents-list', async (info, tab) => {
      state.save({ targetSiteTabId: tab.id })
      await tabs.openAcmsSite()
      const path = new URL(tab.url).pathname
      const message: SearchContentMessage = {
        type: 'SearchContent',
        scopeId: state.pick('scopeId'),
        releaseId: state.pick('releaseId'),
        query: { path },
      }
      await sendMessageToTab(tabs.acmsSiteTabId, message)
    })
    super.addListener('acms-contextmenu-add-content', async (info, tab) => {
      state.save({ targetSiteTabId: tab.id })
      await tabs.openAcmsSite()
      const path = new URL(tab.url).pathname
      // TODO: selectorを取得する
      const message: CreateContentMessage = {
        type: 'CreateContent',
        contentHistory: {
          scopeId: state.pick('scopeId'),
          releaseId: state.pick('releaseId'),
          path,
          selector: '',
          content: '',
        },
      }
      await sendMessageToTab(state.pick('acmsSiteTabId'), message)
    })
    // contextMenus.addListener('acms-contextmenu-edit-content', async (info, tab) => {})
  }

  private addStateListener() {
    state.addStateListener('scopeId', (value, oldValue) => {
      if (value) {
        super.enableContextMenu('acms-contextmenu-contents-list')
      } else {
        super.disableContextMenu('acms-contextmenu-contents-list')
      }
    })
    state.addStateListener('releaseId', (value, oldValue) => {
      if (value) {
        super.enableContextMenu('acms-contextmenu-add-content')
        super.enableContextMenu('acms-contextmenu-edit-content')
      } else {
        super.disableContextMenu('acms-contextmenu-add-content')
        super.disableContextMenu('acms-contextmenu-edit-content')
      }
    })
  }
}

export const contextMenus = new Menus()
