import { CONTEXT_MENU_ROOT_ID, CONTEXT_MENU_ROOT_TITLE } from './constants/context-menu'
import { ContextMenus } from './utils/chrome/context-menu'
import { PopupWindow } from './utils/chrome/popup-window'

// NOTE: 変数格納してないと、onclickFnMapが初期化されてることがあるので注意
const popupWindow = new PopupWindow({ left: 0 })
const contextMenus = new ContextMenus(CONTEXT_MENU_ROOT_ID, CONTEXT_MENU_ROOT_TITLE)
contextMenus.initialize(() => {
  contextMenus.createChildMenu('acms-contextmenu-select-scope', 'Projectの選択', (info, tab) => popupWindow.create(''))
  contextMenus.createChildMenu('acms-contextmenu-add-content', 'コンテンツの追加', (info, tab) =>
    popupWindow.create('')
  )
})

// TODO: scope取得 & 認証
