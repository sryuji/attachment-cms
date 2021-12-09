import { ACMS_SITE_URL, CONTEXT_MENU_ROOT_ID, CONTEXT_MENU_ROOT_TITLE } from './service/context-menus.constants'
import { ContextMenus } from './utils/chrome/context-menus'
import { TabCoordinator } from './utils/chrome/tab-coordinator'

// NOTE: 変数格納してないと、onclickFnMapが初期化されてることがあるので注意
const tabCoordinator = new TabCoordinator()
const contextMenus = new ContextMenus(CONTEXT_MENU_ROOT_ID, CONTEXT_MENU_ROOT_TITLE)
const contentUrlHandler = (scopeId: number, releaseId: number) => {
  let url = `${ACMS_SITE_URL}/scopes/${scopeId}/releases`
  if (releaseId) url = `${url}/${releaseId}`
  return url
}
contextMenus.initialize(() => {
  contextMenus.createChildMenu('acms-contextmenu-select-scope', 'Projectの選択', (info, tab) => {
    tabCoordinator.openAcmsSiteUrl(`${ACMS_SITE_URL}/scopes`)
  })
  // contextMenus.createChildMenu('acms-contextmenu-contents-list', 'コンテンツの一覧', (info, tab) =>
  //   tabCoordinator.openAcmsSiteUrl(contentUrlHandler(scopeId, releaseId))
  // )
  // contextMenus.createChildMenu('acms-contextmenu-add-content', 'コンテンツの追加', (info, tab) =>
  //   tabCoordinator.openAcmsSiteUrl(contentUrlHandler(scopeId, releaseId))
  // )
  // contextMenus.createChildMenu('acms-contextmenu-edit-content', 'コンテンツの編集', (info, tab) =>
  //   tabCoordinator.openAcmsSiteUrl(contentUrlHandler(scopeId, releaseId))
  // )
})
