import Vue from 'vue'
import { NotificationType } from '~/services/constants'

type EventName = 'messages' | 'error'
type EventHandler =
  | ((err: Error) => void | Promise<void>)
  | ((messages: string[] | string, type?: NotificationType, duration?: number) => void | Promise<void>)

class EventBus {
  private bus: Vue

  constructor() {
    this.bus = new Vue()
  }

  initializeEvent(event: EventName, handler: EventHandler) {
    this.bus.$on(event, handler)
  }

  finalizeEvent(event: EventName) {
    this.bus.$off(event)
  }

  notifyMessages(messages: string[] | string, type?: NotificationType, duration?: number) {
    this.bus.$emit('messages', messages, type, duration)
  }

  notifyError(err: Error) {
    this.bus.$emit('error', err)
  }
}
const eventBus = new EventBus()

export { eventBus }
