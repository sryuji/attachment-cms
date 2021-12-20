import { CreateContentMessage } from '../types/message'
import { ContextMenus } from '../utils/chrome/context-menus'
import { openTab, sendMessageToTab } from '../utils/chrome/tabs.util'
import { getPathname } from '../utils/url'
import { ContextMenuId, CONTEXT_MENU_ROOT_ID, CONTEXT_MENU_ROOT_TITLE } from './constants'
import { state } from './state'
import { tabs } from './tabs'
import { SCOPES_URL } from './urls'

class Menus extends ContextMenus<ContextMenuId> {
  createMenus() {
    const releaseId = state.pick('releaseId')
    super.initialize([
      { id: CONTEXT_MENU_ROOT_ID, title: CONTEXT_MENU_ROOT_TITLE, parentId: null },
      { id: 'acms-contextmenu-select-scope', title: 'Projectの選択', enabled: true, parentId: CONTEXT_MENU_ROOT_ID },
      { id: 'acms-contextmenu-contents-list', title: 'コンテンツの一覧', enabled: !!state.pick('scopeId'), parentId: CONTEXT_MENU_ROOT_ID },
      { id: 'acms-contextmenu-add-content', title: 'Click先にコンテンツを追加', enabled: !!releaseId, parentId: CONTEXT_MENU_ROOT_ID },
      { id: 'acms-contextmenu-edit-content', title: 'Click先のコンテンツを編集', enabled: !!releaseId, parentId: CONTEXT_MENU_ROOT_ID },
      { id: 'acms-contextmenu-attach-lib', title: 'このタブへ限定公開機能を有効化(再適用)', enabled: !!releaseId, parentId: CONTEXT_MENU_ROOT_ID },
    ])
  }

  addClickListener() {
    super.addListener('acms-contextmenu-select-scope', async (info, tab) => {
      state.save({ targetSiteTabId: tab.id })
      await openTab(state.pick('acmsSiteTabId'), SCOPES_URL)
    })
    super.addListener('acms-contextmenu-contents-list', async (info, tab) => {
      state.save({ targetSiteTabId: tab.id })
      await tabs.openAcmsSite(getPathname(tab.url))
    })
    super.addListener('acms-contextmenu-add-content', async (info, tab) => {
      state.save({ targetSiteTabId: tab.id })
      await tabs.openAcmsSite()
      // TODO: selectorを取得する
      const message: CreateContentMessage = {
        type: 'CreateContent',
        contentHistory: {
          scopeId: state.pick('scopeId'),
          releaseId: state.pick('releaseId'),
          path: getPathname(tab.url),
          selector: '',
          content: '',
        },
      }
      await sendMessageToTab(state.pick('acmsSiteTabId'), message)
    })
    // contextMenus.addListener('acms-contextmenu-edit-content', async (info, tab) => {})
    super.addListener('acms-contextmenu-attach-lib', async (info, tab) => {
      await state.save({ targetSiteTabId: tab.id })
      tabs.requestAttachLib(tab.id)
    })
  }
}

export const contextMenus = new Menus()
