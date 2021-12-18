import { state } from './background/state'
import { contextMenus } from './background/context-menus'
import { messages } from './background/messages'
import { tabs } from './background/tabs'

state.load().then(async () => {
  contextMenus.createMenus()
  contextMenus.addClickListener()
  contextMenus.addStateListener()

  messages.listen()

  tabs.listenOnUpdated()
})
