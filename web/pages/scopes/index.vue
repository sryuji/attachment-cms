<template>
  <div class="">
    <h1>Scopes</h1>
  </div>
</template>

<script lang="ts">
import { Component, namespace, Vue } from 'nuxt-property-decorator'
import { scopesStore } from '~/store'
import { Scope } from '~/types/attachment-cms-server/db/entity/scope.entity'

const scopesModule = namespace('scopes')

@Component({
  head() {
    return {
      title: 'Scopes',
    }
  },
})
export default class ScopesPageComponent extends Vue {
  async beforeMount() {
    await scopesStore.getScopes({ page: 1 })
  }

  @scopesModule.Getter('scopes') scopes: Scope[]
}
</script>
