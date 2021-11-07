<template>
  <div class="container mx-auto p-2 flex justify-center">
    <div class="min-w-96">
      <h1 class="my-6">please sign in</h1>
      <div class="my-6 text-lg">
        <p>おかえりなさいませ</p>
      </div>
      <div class="mt-12">
        <img
          class="cursor-pointer object-contain"
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
  meta: { auth: false },
  head() {
    return {
      title: 'Sign In',
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
