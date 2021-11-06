<template>
  <div id="attachment-cms">
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

    <confirmation />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import Notification from '~/components/notification.vue'
import Navbar from '~/components/navbar.vue'
import SideMenu from '~/components/side-menu.vue'
import Confirmation from '~/components/confirmation.vue'
import { authStore } from '~/store'
import { UnauthorizedError } from '~/utils/errors'
import { AttachmentCMS } from '~/static/lib/attachment-cms-lib.es'

@Component({ components: { SideMenu, Navbar, Notification, Confirmation } })
export default class DefaultLayout extends Vue {
  beforeMount() {
    const ignoreAuth = authStore.ignoreAuth
    authStore.fetchRequiredDataOnLoggedIn().catch((err) => {
      if (ignoreAuth && err instanceof UnauthorizedError) return Promise.resolve()
      throw err
    })

    new AttachmentCMS({
      token: '0601c7e9-af0b-4e1d-a0e7-fde28278e9c2',
      id: 'attachment-cms',
      baseUrl: 'http://localhost:3000',
    }).run()
  }
}
</script>
