import { FormValidationCoordinator } from './form-validation-coordinator'

describe('FormValidationCoordinator', () => {
  describe('#initializeValidationEvent', () => {
    const fvc = new FormValidationCoordinator()
    fvc.initializeValidationEvent()

    test('initialize', () => {
      expect((fvc as any).validators).toEqual({})
    })

    test('when register-form-validator event', () => {
      ;(fvc as any).registerValidatorHandler('test', () => {})
      expect((fvc as any).validators.test).toBeDefined()
    })
  })

  describe('#finalizeValidationEvent', () => {})
  describe('#validateAll', () => {})
})
