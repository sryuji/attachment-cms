import Vue from 'vue'
import { eventBus } from './event-bus'
import { FormValidationCoordinator } from './form-validation-coordinator'

// WARNING: 方針として、vueのmixinやextendは使わない。typescriptのextendsと他クラスへの処理の移譲で達成する
// また、親クラスはcallbackが必要な処理のみ定義. callback不要なのはPure classで移譲により処理させる(ex. RouteController)

export abstract class Form extends Vue {
  validator: FormValidationCoordinator
  invalidNotification = '入力不備があります'

  /**
   * Need call initializeForm
   */
  abstract created(): void
  /**
   * Need call finalizeForm
   */
  abstract beforeDestroy(): void

  initializeForm() {
    if (!this.validator) {
      this.validator = new FormValidationCoordinator()
      this.validator.initializeValidationEvent()
    }
  }

  finalizeForm() {
    this.validator.finalizeValidationEvent()
  }

  validateAll() {
    const valid = this.validator.validateAll()
    if (!valid && this.invalidNotification) eventBus.notifyMessages(this.invalidNotification, 'warning')
    return valid
  }
}
