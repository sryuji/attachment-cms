export const CONTEXT_MENU_ROOT_ID = 'acms-contextmenu-parent'
export const CONTEXT_MENU_ROOT_TITLE = 'attachment CMS'
export const CONTEXT_MENU_CHILD_IDS = [
  'acms-contextmenu-select-scope',
  'acms-contextmenu-add-content',
  'acms-contextmenu-edit-content',
  'acms-contextmenu-contents-list',
] as const
export type ContextMenuChildId = typeof CONTEXT_MENU_CHILD_IDS[number]

// export const ACMS_SITE_URL = 'https://attachment-cms.dev'
export const ACMS_SITE_URL = 'http://localhost:3001'

export const ACMS_STATE_ID = 'ACMS_STORAGE_ID'
