<template>
  <div class="container mx-auto p-2 flex justify-center">
    <div class="card w-full sm:w-1/2 shadow-2xl bg-grey-lighter">
      <div class="card-body">
        <p class="mt-3 text-2xl">
          <span>登録後、お試し用のProjectに招待されます。</span><br /><br />
          <span>ご自由にお試しください。</span><br />
        </p>
        <div class="justify-end card-actions">
          <button class="">
            <img
              class="cursor-pointer object-contain"
              src="~/assets/images/google/btn_google_signin_light_normal_web.png"
              @click="moveGoogleAuthPage"
            />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { NavigationGuardNext, Route } from 'vue-router'
import { authStore } from '~/store'

@Component({
  meta: { auth: false },
  head() {
    return {
      title: 'Sign up',
    }
  },
})
export default class extends Vue {
  // Lifecycle hooks
  beforeRouteEnter(to: Route, from: Route, next: NavigationGuardNext) {
    if (authStore.isLoggedIn) next('/scopes')
    next()
  }

  // methods
  moveGoogleAuthPage(): void {
    window.location.href = `${this.$config.API_BASE_URL}/auth/google`
  }
}
</script>
