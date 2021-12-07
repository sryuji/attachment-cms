export const CONTEXT_MENU_ROOT_ID = 'acms-contextmenu-parent'
export const CONTEXT_MENU_CHILD_IDS = [
  'acms-contextmenu-select-scope',
  'acms-contextmenu-add-content',
  'acms-contextmenu-move-release-screen',
] as const
export type ContextMenuChildId = typeof CONTEXT_MENU_CHILD_IDS[number]
