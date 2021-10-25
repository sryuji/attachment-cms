<template>
  <div>
    <notification />
    <div class="font-body h-screen w-full drawer drawer-end">
      <input id="my-drawer" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content">
        <navbar />
        <nuxt class="p-2" />
      </div>
      <div class="drawer-side">
        <label for="my-drawer" class="drawer-overlay"></label>
        <side-menu />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import Notification from '~/components/notification.vue'
import Navbar from '~/components/navbar.vue'
import SideMenu from '~/components/side-menu.vue'
import { authStore } from '~/store'
import { UnauthorizedError } from '~/utils/errors'

@Component({ components: { SideMenu, Navbar, Notification } })
export default class DefaultLayout extends Vue {
  beforeMount() {
    const ignoreAuth = authStore.ignoreAuth
    authStore.fetchRequiredDataOnLoggedIn().catch((err) => {
      if (ignoreAuth && err instanceof UnauthorizedError) return Promise.resolve()
      throw err
    })
  }
}
</script>
