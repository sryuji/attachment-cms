<template>
  <div class="font-body flex w-full">
    <notification />
    <div class="w-64 flex-shrink-0 text-gray-700 bg-white">
      <side-menu></side-menu>
    </div>
    <div class="flex-1 m-5 text-gray-700 bg-white">
      <nuxt class="container mx-auto" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import SideMenu from '~/components/side-menu.vue'
import Notification from '~/components/notification.vue'

@Component({ components: { SideMenu, Notification } })
export default class DefaultLayout extends Vue {
  beforeMount() {}
}
</script>
