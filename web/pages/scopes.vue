<template>
  <div class="">
    <h1>Scopes</h1>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  head() {
    return {
      title: 'Scopes',
    }
  },
})
export default class ScopesPageComponent extends Vue {
  mounted() {}
}
</script>
