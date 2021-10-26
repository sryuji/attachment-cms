<template>
  <div v-if="loading" class="fixed inset-0 bg-black bg-opacity-25 z-50"></div>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'

/**
 * 下記で読み込み中の開始/終了ができる
 * this.$nuxt.$loading.start()
 * this.$nuxt.$loading.finish()
 */
@Component({})
export default class Loading extends Vue {
  loading = false

  start() {
    this.loading = true
  }

  finish() {
    this.loading = false
  }
}
</script>