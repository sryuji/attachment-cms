import { FormValidationCordinator } from './form-validation-cordinator'

describe('FormValidationCordinator', () => {
  describe('#initializeValidationEvent', () => {
    const fvc = new FormValidationCordinator()
    fvc.initializeValidationEvent()

    test('initialize', () => {
      expect((fvc as any).validators).toEqual({})
    })

    test('when register-form-validator event', () => {
      ;(fvc as any).registerValidator('test', () => {})
      expect((fvc as any).validators.test).toBeDefined()
    })
  })

  describe('#finalizeValidationEvent', () => {})
  describe('#validateAll', () => {})
})
