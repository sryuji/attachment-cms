<template>
  <div v-if="open" class="modal modal-open">
    <div class="modal-box max-w-4xl">
      <div class="mb-2">
        <h1 class="text-2xl">{{ title }}</h1>
      </div>
      <div>
        <p>{{ message }}</p>
      </div>
      <div class="modal-action">
        <label class="btn btn-primary mr-2" @click="correct">{{ correctButton }}</label>
        <label class="btn" @click="close">{{ closeButton }}</label>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Vue } from 'nuxt-property-decorator'
import Confirmation from '~/components/confirmation.vue'
import { ConfirmationType } from '~/services/constants'
import { ConstructorOptions, ExtendableError } from '~/utils/errors'
import { eventBus } from '~/utils/event-bus'

export class ConfirmationCloseError extends ExtendableError {
  constructor(options?: ConstructorOptions) {
    super(options)
    this.name = 'ServerError'
  }
}

@Component({
  components: { Confirmation },
})
export default class ContentHistoryModal extends Vue {
  open: boolean = false
  title: string = ''
  message: string = ''
  correctButton: string = 'OK'
  closeButton: string = 'Close'
  resolve: Function = null
  reject: Function = null

  // Lifecycle hooks
  beforeMount() {
    eventBus.initializeEvent('confirmation', this.confirm)
  }

  beforeDestroy() {
    eventBus.finalizeEvent('confirmation')
  }

  // Getters

  // methods
  @Emit()
  correct() {
    this.resolve()
  }

  @Emit()
  close() {
    this.reject()
  }

  confirm(
    { message = '', title = '', correctButton = 'OK', closeButton = 'Close' }: ConfirmationType,
    resolve: Function,
    reject: Function
  ) {
    this.message = message
    this.title = title
    this.correctButton = correctButton || this.correctButton
    this.closeButton = closeButton || this.closeButton
    this.resolve = () => {
      resolve()
      this.open = false
      this.resolve = this.reject = null
    }
    this.reject = () => {
      reject(new ConfirmationCloseError())
      this.open = false
      this.resolve = this.reject = null
    }
    this.open = true
  }
}
</script>