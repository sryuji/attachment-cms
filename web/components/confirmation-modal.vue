<template>
  <div v-if="open" class="modal modal-open confirmation-modal">
    <div class="modal-box max-w-4xl">
      <div class="mb-2">
        <h1 class="text-2xl">{{ title }}</h1>
      </div>
      <slot :data="data"></slot>
      <div class="modal-action">
        <label class="btn btn-primary mr-2" @click="correct">{{ correctButton }}</label>
        <label class="btn" @click="close">{{ closeButton }}</label>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop } from 'nuxt-property-decorator'
import { ConfirmationCloseError } from '~/utils/errors'
import { Form } from '~/utils/form'

/**
 * async/awaitのmethod処理下でmodalを表示し、Form入力や文字だけでない表示確認をさせたい場合に使う
 */
@Component({
  components: {},
})
export default class ConfirmationModal<D> extends Form {
  @Prop({ default: '' }) title: string
  @Prop({ default: 'OK' }) correctButton: string
  @Prop({ default: 'Close' }) closeButton: string
  open: boolean = false
  data: D = null
  resolve: Function = null
  reject: Function = null

  // Lifecycle hooks
  created(): void {
    super.initializeForm()
  }

  beforeDestroy(): void {
    super.finalizeForm()
  }

  // methods
  correct() {
    if (!this.validateAll()) return
    this.resolve()
  }

  close() {
    this.reject()
  }

  confirm(data: D): Promise<D> {
    this.data = data
    return new Promise((resolve, reject) => {
      this.resolve = () => {
        resolve(this.data)
        this.open = false
        this.resolve = this.reject = null
      }
      this.reject = () => {
        reject(new ConfirmationCloseError())
        this.open = false
        this.resolve = this.reject = null
      }
      this.open = true
    })
  }
}
</script>

<style lang="scss" scoped>
.confirmation-modal {
  align-items: center;
  padding: 0.5rem;
}
</style>