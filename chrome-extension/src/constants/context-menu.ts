export const CONTEXT_MENU_ROOT_ID = 'acms-contextmenu-parent'
export const CONTEXT_MENU_ROOT_TITLE = 'attachment CMS'
export const CONTEXT_MENU_CHILD_IDS = ['acms-contextmenu-select-scope', 'acms-contextmenu-add-content'] as const
export type ContextMenuChildId = typeof CONTEXT_MENU_CHILD_IDS[number]
