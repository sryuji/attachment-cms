<template>
  <!-- nuxt側でerrorが発生した時のみ使われる. 404はroutingで処理している -->
  <div class="font-body">
    <p class="bold md:text-3xl">
      <span v-if="error && error.statusCode === 404">ページが見つかりません</span>
      <span v-else>エラーが発生しました。</span>
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class Error extends Vue {
  layout: string = 'default'
  @Prop()
  error?: object
}
</script>
