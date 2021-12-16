import { state } from './background/state'
import { contextMenus } from './background/context-menus'
import { messages } from './background/messages'

state.load().then(async () => {
  await contextMenus.initialize()
  await messages.listen()
})
