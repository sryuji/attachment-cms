<template>
  <div>
    <div class="flex-shrink-0 px-8 py-4 flex flex-row items-center justify-between">
      <nuxt-link
        :to="{ name: 'index' }"
        class="text-lg font-semibold tracking-widest text-gray-900 rounded-lg focus:outline-none focus:shadow-outline"
        >Dashboard</nuxt-link
      >
    </div>
    <div class="py-2 bg-base-200">
      <ul class="menu m-2 p-4 shadow-lg bg-base-100 rounded-box">
        <li class="menu-title">
          <span> Table List </span>
        </li>
        <template v-if="true">
          <li>
            <nuxt-link :to="{ name: 'scopes' }"> Scopes </nuxt-link>
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
            <nuxt-link :to="{ name: 'auth-sign-in' }"> Sign In / Sign Up</nuxt-link>
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({})
export default class SideMenuComponent extends Vue {
  mounted() {}
  signOut() {
    this.$api.auth.signOut()
  }
}
</script>
