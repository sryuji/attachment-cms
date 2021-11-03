<template>
  <span></span>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { REDIRECT_TO, NotificationType } from '~/services/constants'
import { RedirectError, ServerValidationError } from '~/utils/errors'
import { eventBus } from '~/utils/event-bus'
import { saveModel } from '~/utils/local-storage'

@Component({})
export default class NotificationComponent extends Vue {
  beforeMount() {
    eventBus.initializeEvent('error', this.handleError)
    eventBus.initializeEvent('messages', this.showMessages)
  }

  beforeDestroy() {
    eventBus.finalizeEvent('error')
    eventBus.finalizeEvent('messages')
  }

  handleError(err: Error): void | Promise<void> {
    const name = err ? err.name : null
    let message
    switch (name) {
      case 'ServerValidationError':
        if (err instanceof ServerValidationError) message = err.baseData.message
        if (!message) message = 'サーバーにて入力エラーが検出されました。入力内容を再確認してください'
        return this.showMessages(message, 'warning')
      case 'BadRequestError':
        return this.showMessages('権限がないため表示できません。', 'warning')
      case 'ForbiddenError':
        return this.showMessages('権限がないため表示できません。', 'warning')
      case 'NotFoundError':
        return this.$router.replace({ name: 'notFound' }).catch((err) => err)
      case 'UnauthorizedError':
        return this.handleUnauthorizedError()
      case 'RedirectError':
        if (err instanceof RedirectError) this.redirectPage(err.baseData)
        return
      case 'ClientValidationError':
        return this.showMessages(err.message || '入力エラーが検出されました。入力内容を再確認してください', 'warning')
      case 'NetworkError':
        return this.showMessages('通信に失敗しました。 通信状況を確認した後、再実行してください。', 'error')
      case 'TimeoutError':
        return this.showMessages('通信がタイムアウトしました。通信状況を確認した後、再実行してください。', 'error')
      case 'ServerError':
        return this.showMessages('サーバーでシステムエラーが発生しました。', 'error')
      default:
        return this.showMessages('エラーが発生しました。', 'error')
    }
  }

  showMessages(messages: string[] | string, type?: NotificationType, duration?: number): void {
    messages = Array.isArray(messages) ? messages : [messages]
    let fitToScreen = false
    if (duration === undefined) {
      switch (type) {
        case 'error':
          duration = null
          fitToScreen = true
          break
        case 'warning':
          duration = 6000
          break
        default:
          duration = 3000
      }
    }
    // https://github.com/shakee93/vue-toasted#options
    const options = {
      theme: 'outline',
      type: ['warning', 'info'].includes(type) ? 'info' : type,
      duration,
      fitToScreen,
      className: [type],
    }
    messages.forEach((message) => this.$toasted.show(message, options))
  }

  handleUnauthorizedError(): void {
    this.showMessages('ログインしてください。', 'warning')
    saveModel(REDIRECT_TO, this.$route as any)
    this.$router.replace({ name: 'auth-sign-in' }).catch((err) => err)
  }

  redirectPage(data: any): void {
    window.onbeforeunload = null
    window.location.href = data.location
  }
}
</script>

<style lang="scss">
.toasted-container {
  .toasted {
    &.outline {
      &.warning.info {
        border-color: #f90;
        color: #f90;
      }
      &.info {
        border-color: #676767;
        color: #676767;
      }
    }
  }
}
</style>