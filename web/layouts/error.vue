<template>
  <!-- nuxt側でerrorが発生した時のみ使われる. 404はroutingで処理している -->
  <div class="container mx-auto">
    <p class="bold md:text-3xl">
      <span v-if="error && error.statusCode === 404">ページが見つかりません</span>
      <span v-else>エラーが発生しました。</span>
    </p>
  </div>
</template>


<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component
export default class ErrorLayout extends Vue {
  layout: string = 'default'
  @Prop()
  error?: object

  beforeMount() {}
}
</script>
