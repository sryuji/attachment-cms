import { State } from '../utils/chrome/state'
import { ACMS_STATE_STORAGE_KEY } from './constants'
import { contextMenus } from './context-menus'

const data = {
  acmsSiteTabId: null as number,
  targetSiteTabId: null as number,
  scopeId: null as number,
  releaseId: null as number,
  limitedReleaseToken: '',
}
export type StateType = typeof data

class LocalState extends State<StateType> {
  constructor() {
    super(ACMS_STATE_STORAGE_KEY)
    this.data = data
  }

  listen() {
    state.addListener('scopeId', (value, oldValue) => {
      if (value) {
        contextMenus.enableContextMenu('acms-contextmenu-contents-list')
      } else {
        contextMenus.disableContextMenu('acms-contextmenu-contents-list')
      }
    })
    state.addListener('releaseId', (value, oldValue) => {
      if (value) {
        contextMenus.enableContextMenu('acms-contextmenu-add-content')
        contextMenus.enableContextMenu('acms-contextmenu-edit-content')
        contextMenus.enableContextMenu('acms-contextmenu-attach-lib')
      } else {
        contextMenus.disableContextMenu('acms-contextmenu-add-content')
        contextMenus.disableContextMenu('acms-contextmenu-edit-content')
        contextMenus.disableContextMenu('acms-contextmenu-attach-lib')
      }
    })
  }
}

export const state = new LocalState()
