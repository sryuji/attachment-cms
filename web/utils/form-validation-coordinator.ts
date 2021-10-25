import { eventBus } from '~/utils/event-bus'

export class FormValidationCoordinator {
  validators: Record<string, Function>

  constructor() {
    this.validators = {}
  }

  private registerValidatorHandler = (validatorKey: string, validator: Function) => {
    if (!validatorKey || !validator) throw new Error('Need validatorKey and validator')
    this.validators[validatorKey] = validator
  }

  private unregisterValidatorHandler = (validatorKey: string) => {
    if (!validatorKey) throw new Error('Need validatorKey')
    delete this.validators[validatorKey]
  }

  initializeValidationEvent() {
    this.validators = {}
    eventBus.initializeEvent('register-form-validator', this.registerValidatorHandler)
    eventBus.initializeEvent('unregister-form-validator', this.unregisterValidatorHandler)
  }

  finalizeValidationEvent() {
    eventBus.finalizeEvent('register-form-validator')
    eventBus.finalizeEvent('unregister-form-validator')
    this.validators = {}
  }

  validateAll(): boolean {
    return Object.values(this.validators).every((validator) => validator())
  }
}
