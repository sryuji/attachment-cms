<template>
  <div class="container mx-auto">
    <template v-if="scope">
      <h1>{{ scope.name }}</h1>
      <div>domain: {{ scope.domain }}</div>
      <div>test domain: {{ scope.testDomain }}</div>
      <div>{{ scope.description }}</div>
      <div v-for="release in scope.releases" :key="release.id">
        <span>{{ release.releasedAt | formatDatetime }}</span>
      </div>
    </template>
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
export default class ScopePage extends Vue {
  @scopesModule.State('scopes') scopes: Scope[]

  async beforeMount() {
    await scopesStore.getScopes({ page: 1 })
  }

  get scope() {
    return this.scopes && this.scopes.find((r) => r.id === this.id)
  }

  get id(): number {
    return parseInt(this.$route.params.id)
  }
}
</script>
