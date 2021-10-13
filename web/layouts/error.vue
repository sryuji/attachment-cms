<template>
  <!-- nuxt側でerrorが発生した時のみ使われる. 404はroutingで処理している -->
  <div class="font-body w-full">
    <navbar />
    <p class="bold md:text-3xl">
      <span v-if="error && error.statusCode === 404">ページが見つかりません</span>
      <span v-else>エラーが発生しました。</span>
    </p>
  </div>
</template>


<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import Navbar from '~/components/navbar.vue'

@Component({ components: { Navbar } })
export default class DefaultLayout extends Vue {
  beforeMount() {}
}
</script>
