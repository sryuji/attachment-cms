<template>
  <div>
    <notification />
    <div class="font-body h-screen w-full drawer drawer-end">
      <input id="my-drawer" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content">
        <navbar />
        <nuxt />
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

@Component({ components: { SideMenu, Navbar, Notification } })
export default class DefaultLayout extends Vue {
  beforeMount() {}
}
</script>
