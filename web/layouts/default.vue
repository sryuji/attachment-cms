<template>
  <div class="font-body flex w-full">
    <div class="w-72 flex-shrink-0 text-gray-700 bg-white">
      <side-menu></side-menu>
    </div>
    <div class="flex-1 m-5 text-gray-700 bg-white">
      <nuxt />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import SideMenu from '@/components/side-menu.vue'

@Component({ components: { SideMenu } })
export default class Default extends Vue {
  mounted() {}
}
</script>

<style lang="scss">
// @use '~/assets/stylesheets/tailwind.scss';
</style>