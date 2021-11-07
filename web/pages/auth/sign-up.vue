<template>
  <div class="container mx-auto p-2 flex justify-center">
    <div>
      <h1 class="my-6">please sign up</h1>
      <div class="my-6 text-lg">
        <p>アカウント作成後、自動的にデモサイトを利用したCMS設定体験に招待されます。</p>
        <p>TODO: まだ未達</p>
      </div>
      <div class="my-12">
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
