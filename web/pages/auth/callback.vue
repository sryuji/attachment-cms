<template>
  <div class="container mx-auto p-2"></div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { INVITATION_KEY, JWT_AVAILABLE_REFRESH, JWT_KEY, REDIRECT_TO } from '~/services/constants'
import { deleteModel, fetchModel, fetchProperty, saveProperty } from '~/utils/local-storage'
import { authStore } from '~/store'
import { eventBus } from '~/utils/event-bus'

@Component({
  meta: { auth: false },
  head() {
    return {}
  },
})
export default class AuthSignInPageComponent extends Vue {
  async beforeMount(): Promise<void> {
    await this.$nextTick()
    this.$nuxt.$loading.start()
    try {
      // NOTE: 認証フローは、 // sign-in.vue -> /auth/googole -> google認証 -> /auth/google/redirect -> (refreshToken cookie)  -> callback.vue -> GET accessToken with refreshToken cookie
      saveProperty(JWT_KEY, JWT_AVAILABLE_REFRESH, true)
      await authStore.refreshAccessToken()
      await this.joinScopeByInvitation()

      const route = fetchModel(REDIRECT_TO) as any
      if (route && (route.path || route.name)) {
        this.$router.replace(route)
        deleteModel(REDIRECT_TO)
      } else {
        this.$router.replace({ name: 'scopes' })
      }
    } finally {
      this.$nuxt.$loading.finish()
    }
  }

  async joinScopeByInvitation() {
    try {
      const token: string = fetchProperty(INVITATION_KEY, 'token')
      if (!token) return

      await this.$api.scopeInvitations.join(token)
      eventBus.notifyMessages('プロジェクトに参加しました。')
    } finally {
      deleteModel(INVITATION_KEY)
    }
  }
}
</script>
