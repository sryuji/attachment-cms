<template>
  <div v-if="open" class="modal modal-open confirmation" :class="style">
    <div class="modal-box max-w-4xl">
      <div class="mb-2">
        <h1 class="text-2xl title">{{ title }}</h1>
      </div>
      <div>
        <p class="message">{{ message }}</p>
      </div>
      <div class="modal-action">
        <label class="btn mr-2 correct" @click="correct">{{ correctButton }}</label>
        <label class="btn close" @click="close">{{ closeButton }}</label>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Vue } from 'nuxt-property-decorator'
import { ConfirmationStyleType, ConfirmationType } from '~/services/constants'
import { ConfirmationCloseError } from '~/utils/errors'
import { eventBus } from '~/utils/event-bus'

@Component({
  components: {},
})
export default class Confirmation extends Vue {
  open: boolean = false
  title: string = ''
  message: string = ''
  style: ConfirmationStyleType
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
    { message = '', title = '', correctButton = 'OK', closeButton = 'Close', style = 'default' }: ConfirmationType,
    resolve: Function,
    reject: Function
  ) {
    this.message = message
    this.title = title
    this.style = style
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

<style lang="scss" scoped>
.confirmation {
  align-items: center;
  padding: 0.5rem;

  &.default {
    .modal-box {
      .modal-action {
        .btn.correct {
          background-color: #2779bd;
          border-color: #2779bd;
          color: white;
        }
      }
    }
  }

  &.error {
    .modal-box {
      border: 8px solid #cc1f1a;

      .modal-action {
        .btn.correct {
          background-color: #cc1f1a;
          border-color: #cc1f1a;
          color: white;
        }
      }
    }
  }

  &.warning {
    .modal-box {
      border: 6px solid #de751f;

      .modal-action {
        .btn.correct {
          background-color: #de751f;
          border-color: #de751f;
          color: white;
        }
      }
    }
  }
}
</style>