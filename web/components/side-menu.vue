<template>
  <div class="overflow-y-auto w-80 bg-base-100 text-base-content">
    <div class="py-2 bg-base-200">
      <ul class="menu m-2 p-4 shadow-lg bg-base-100 rounded-box">
        <template v-if="isLoggedIn">
          <li class="text-lg font-bold">
            <span> Scope List </span>
          </li>
          <li v-for="scope in scopes" :key="scope.id">
            <nuxt-link :to="{ path: `/scopes/${scope.id}/releases` }">{{ scope.name }}</nuxt-link>
          </li>
          <li class="text-lg font-bold mt-5">
            <span> Others</span>
          </li>
          <li>
            <nuxt-link :to="{ path: `/scopes/new` }"> Create new Scope </nuxt-link>
          </li>
          <li>
            <nuxt-link :to="{ name: 'accounts' }"> Account </nuxt-link>
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
import { Component, namespace, Vue } from 'nuxt-property-decorator'
import { authStore } from '~/store'
import { Scope } from '~/types/attachment-cms-server/db/entity/scope.entity'

const scopesModule = namespace('scopes')

@Component({})
export default class SideMenuComponent extends Vue {
  @scopesModule.State('scopes') scopes: Scope[]

  get isLoggedIn(): boolean {
    return authStore.isLoggedIn
  }

  async signOut() {
    await authStore.signOut()
    const rootName = 'index'
    if (this.$route.name !== rootName) this.$router.replace({ name: rootName })
  }
}
</script>
