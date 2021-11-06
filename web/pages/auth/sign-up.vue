<template>
  <div class="container mx-auto">
    <h1 class="mb-6">Sign up</h1>
    <div>
      <p>TODO: 登録すると、自動的にデモサイトに招待されるように対応</p>
    </div>
    <div>
      <img
        class="cursor-pointer"
        src="~/assets/images/google/btn_google_signin_light_normal_web.png"
        @click="moveGoogleAuthPage"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  meta: { auth: false },
  head() {
    return {
      title: 'Sign Up',
    }
  },
})
export default class extends Vue {
  mounted() {}
  moveGoogleAuthPage(): void {
    window.location.href = `${this.$config.API_BASE_URL}/auth/google`
  }
}
</script>
