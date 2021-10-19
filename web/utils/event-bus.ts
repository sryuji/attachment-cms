import Vue from 'vue'
import { NotificationType } from '~/services/constants'

type EventName = 'messages' | 'error' | 'register-form-validator' | 'unregister-form-validator'
/**
 * WARNING: Handlerをclass functionを受け渡すと、そのfunction内のthisがvue instanceになってしまう問題あり...() => {}形式で渡すように注意
 */
type EventHandler =
  | ((err: Error) => void | Promise<void>)
  | ((messages: string[] | string, type?: NotificationType, duration?: number) => void | Promise<void>)
  | ((validatorKey: string, validator: Function) => void | Promise<void>)
  | ((validatorKey: string) => void | Promise<void>)

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

  registerFormValidator(validatorKey: string, validator: Function) {
    if (!validatorKey || !validator) throw new Error('Need validatorKey and validator')
    this.bus.$emit('register-form-validator', validatorKey, validator)
  }

  unregisterFormValidator(validatorKey: string) {
    if (!validatorKey) throw new Error('Need validatorKey')
    this.bus.$emit('unregister-form-validator', validatorKey)
  }
}
const eventBus = new EventBus()

export { eventBus }
