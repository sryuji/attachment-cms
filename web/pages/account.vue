<template>
  <div class="">
    <h1>Account</h1>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  head() {
    return {
      title: 'Account',
    }
  },
})
export default class AccountPageComponent extends Vue {
  mounted() {}
}
</script>
