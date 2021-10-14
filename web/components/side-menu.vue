<template>
  <div class="overflow-y-auto w-80 bg-base-100 text-base-content">
    <div class="py-2 bg-base-200">
      <ul class="menu m-2 p-4 shadow-lg bg-base-100 rounded-box">
        <template v-if="isLoggedIn">
          <li class="text-lg font-bold">
            <span> Scopes </span>
          </li>
          <li>
            <nuxt-link :to="{ name: 'scopes' }"> Scopes </nuxt-link>
          </li>
          <li class="text-lg font-bold">
            <span> Other </span>
          </li>
          <li>
            <nuxt-link :to="{ name: 'account' }"> Account </nuxt-link>
          </li>
          <li>
            <a href="" @click.prevent.stop="signOut"> Sign Out </a>
          </li>
        </template>
        <template v-else>
          <li>
            <nuxt-link :to="{ name: 'auth-sign-in' }"> Sign In</nuxt-link>
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { authStore } from '~/store'

@Component({})
export default class SideMenuComponent extends Vue {
  beforeMount() {}

  get isLoggedIn(): boolean {
    return authStore.isLoggedIn
  }

  signOut() {
    authStore.signOut()
  }
}
</script>
