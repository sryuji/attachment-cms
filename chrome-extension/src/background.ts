import { state } from './background/state'
import { contextMenus } from './background/context-menus'
import { messages } from './background/messages'

state.load().then(async () => {
  contextMenus.createMenus()
  contextMenus.addClickListener()
  state.listen()
  messages.listen()
})
