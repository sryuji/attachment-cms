<template>
  <div class="navbar mb-2 shadow-lg bg-neutral text-neutral-content">
    <div class="flex-1 px-2 mx-2">
      <span> </span>
      <nuxt-link :to="{ name: 'index' }" class="text-lg font-bold"> attachment CMS</nuxt-link>
      <span class="ml-2">( α-version )</span>
    </div>
    <div class="flex-none hidden px-2 mx-2 lg:flex">
      <div v-if="!isLoggedIn" class="flex items-stretch">
        <nuxt-link :to="{ name: 'auth-sign-in' }" class="btn btn-ghost btn-sm rounded-btn normal-case">
          Sign In</nuxt-link
        >
      </div>
      <div v-else class="flex items-stretch">
        <nuxt-link :to="{ name: 'accounts' }" class="btn btn-ghost btn-sm rounded-btn normal-case"> Account </nuxt-link>
      </div>
    </div>
    <div class="flex-none">
      <label for="my-drawer" class="btn btn-square btn-ghost">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="inline-block w-6 h-6 stroke-current"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { authStore } from '~/store'

@Component({
  computed: {},
})
export default class Navbar extends Vue {
  beforeMount() {}

  get isLoggedIn() {
    return authStore.isLoggedIn
  }
}
</script>
