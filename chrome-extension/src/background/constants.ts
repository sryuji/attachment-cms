export const CONTEXT_MENU_ROOT_ID = 'acms-contextmenu-parent'
export const CONTEXT_MENU_ROOT_TITLE = 'attachment CMS'
export const CONTEXT_MENU_IDS = [
  CONTEXT_MENU_ROOT_ID,
  'acms-contextmenu-select-scope',
  'acms-contextmenu-add-content',
  'acms-contextmenu-edit-content',
  'acms-contextmenu-contents-list',
  'acms-contextmenu-attach-lib',
] as const
export type ContextMenuId = typeof CONTEXT_MENU_IDS[number]
export const ACMS_STATE_STORAGE_KEY = 'ACMS_STATE_STORAGE_KEY'
