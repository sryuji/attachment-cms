<template>
  <div class="container mx-auto p-2"></div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { REDIRECT_TO } from '~/services/constants'
import { deleteModel, fetchModel } from '~/utils/local-storage'
import { authStore } from '~/store'
import { eventBus } from '~/utils/event-bus'

@Component({
  meta: { auth: false },
  head() {
    return {}
  },
})
export default class AuthRefreshPage extends Vue {
  /**
   * Page Component側からのRequest要求が401の場合、全てここに流れてくる想定
   */
  async beforeMount(): Promise<void> {
    await this.$nextTick()
    this.$nuxt.$loading.start()
    try {
      await authStore.refreshAccessToken()
      authStore.fetchRequiredDataOnLoggedIn()

      const route = fetchModel(REDIRECT_TO) as any
      if (route && (route.path || route.name)) {
        this.$router.replace(route)
        deleteModel(REDIRECT_TO)
      } else {
        this.$router.replace({ name: 'scopes' })
      }
    } catch (err) {
      eventBus.notifyMessages('ログインしてください。', 'warning')
      this.$router.replace({ name: 'auth-sign-in' }).catch((err) => err)
    } finally {
      this.$nuxt.$loading.finish()
    }
  }
}
</script>
