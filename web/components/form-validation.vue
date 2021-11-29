<template>
  <label class="label">
    <p>
      <span v-for="(msg, i) in messages" :key="i" class="label-text-alt text-red-light text-sm"
        >{{ msg }}<br v-if="messages.length - 1 > i"
      /></span>
    </p>
  </label>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'nuxt-property-decorator'
import { eventBus } from '~/utils/event-bus'
import { generateUUIDv4 } from '~/utils/string'
import { Validatorjs } from '~/utils/validatorjs'

type ValueType = string | number | boolean

/**
 * 個々のフォームとメッセージをFormValidationで管理し、
 * FormValidationCordinatorで一括バリデーションを管理
 */
@Component({})
export default class FormValidation extends Vue {
  @Prop() value: ValueType
  @Prop() rules!: any
  @Prop() errorMessages: Record<string, string>

  messages: string[] = []
  validatorKey: string

  beforeMount() {
    this.validatorKey = generateUUIDv4()
    eventBus.registerFormValidator(this.validatorKey, this.validateValue)
  }

  beforeDestroy() {
    eventBus.unregisterFormValidator(this.validatorKey)
  }

  @Watch('value')
  watchValue(val: ValueType, oldVal?: ValueType): void {
    this.validateValue(val)
  }

  validateValue(val: ValueType = this.value): boolean {
    const validation = new Validatorjs({ value: val }, { value: this.rules }, this.errorMessages)
    validation.setAttributeNames({ value: '入力' })

    if (validation.passes()) {
      this.messages = []
      return true
    }
    this.messages = validation.errors.get('value')
    return false
  }
}
</script>
