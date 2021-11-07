<template>
  <div class="container mx-auto p-2">
    <h1 class="mb-6"></h1>
    <div>
      <div>
        <p class="text-xl">authenticating...</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { REDIRECT_TO } from '~/services/constants'
import { deleteModel, fetchModel } from '~/utils/local-storage'
import { authStore } from '~/store'

@Component({
  meta: { auth: false },
  head() {
    return {}
  },
})
export default class AuthSignInPageComponent extends Vue {
  async beforeMount(): Promise<void> {
    // NOTE: 認証フローは、 // sign-in.vue -> /auth/googole -> google認証 -> /auth/google/redirect -> (refreshToken cookie)  -> callback.vue -> GET accessToken with refreshToken cookie
    await authStore.refreshAccessToken()

    const route = fetchModel(REDIRECT_TO) as any
    if (route && (route.path || route.name)) {
      this.$router.replace(route)
      deleteModel(REDIRECT_TO)
    } else {
      this.$router.replace({ name: 'scopes' })
    }
  }
}
</script>
