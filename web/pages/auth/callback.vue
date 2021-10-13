<template>
  <div>
    <h1 class="mb-6"></h1>
    <div class="container mx-auto">
      <div>
        <p class="text-xl">authenticating...</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { AUTH_FLOW_STORAGE_KEY } from '~/services/constants'
import { deleteModel, fetchModel } from '~/utils/local-storage'
import { accountsStore } from '~/store'

@Component({
  head() {
    return {}
  },
})
export default class AuthSignInPageComponent extends Vue {
  async beforeMount(): Promise<void> {
    // NOTE: 認証フローは、 // sign-in.vue -> /auth/googole -> google認証 -> /auth/google/redirect -> (refreshToken cookie)  -> callback.vue -> GET accessToken with refreshToken cookie
    await this.$api.auth.refreshAccessToken()
    await accountsStore.getAccount()
    const flow = fetchModel(AUTH_FLOW_STORAGE_KEY) as any
    if (flow && flow.destination) {
      this.$router.replace({ path: flow.destination, params: flow.params })
      deleteModel(AUTH_FLOW_STORAGE_KEY)
    } else {
      this.$router.replace({ path: '/' })
    }
  }
}
</script>
