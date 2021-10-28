<template>
  <div class="container mx-auto"></div>
</template>

<script lang="ts">
import { Component, namespace, Vue } from 'nuxt-property-decorator'
import { releasesStore } from '~/store'
import { Release } from '~/types/attachment-cms-server/db/entity/release.entity'
import { Scope } from '~/types/attachment-cms-server/db/entity/scope.entity'

const scopesModule = namespace('scopes')

@Component({
  head() {
    return {
      title: 'リリース',
    }
  },
})
export default class PublishPage extends Vue {
  @scopesModule.State('scopes') scopes: Scope[]

  async beforeMount() {}

  get release(): Release {
    return releasesStore.getRelease(this.releaseId)
  }

  get scope() {
    return this.scopes.find((r) => r.id === this.scopeId)
  }

  get releaseId(): number {
    return parseInt(this.$route.params.release_id)
  }

  get scopeId(): number {
    return parseInt(this.$route.params.id)
  }
}
</script>
