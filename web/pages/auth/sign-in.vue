<template>
  <div>
    <h1 class="mb-6">Sign In / Sign Up</h1>
    <div class="container mx-auto">
      <div>
        <img
          class="cursor-pointer"
          src="~/assets/images/google/btn_google_signin_light_normal_web.png"
          @click="moveGoogleAuthPage"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  head() {
    return {
      title: 'Sign In / Sign Up',
    }
  },
})
export default class AuthSignInPageComponent extends Vue {
  mounted() {}
  moveGoogleAuthPage(): void {
    window.location.href = `${this.$config.API_BASE_URL}/auth/google`
  }
}
</script>
