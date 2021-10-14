<template>
  <div class="container mx-auto">
    <template v-if="scope">
      <h1>{{ scope.name }}</h1>
      <span>{{ scope.domain }}</span>
      <span>{{ scope.testDomain }}</span>
      <p>{{ scope.description }}</p>
      <div v-for="release in releases" :key="release.id">
        <span>{{ release.releasedAt | formatDatetime }}</span>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, namespace, Prop, Vue } from 'nuxt-property-decorator'
import { mapGetters } from 'vuex'
import { scopesStore } from '~/store'
import { Scope } from '~/types/attachment-cms-server/db/entity/scope.entity'

const scopesModule = namespace('scopes')

@Component({
  head() {
    return {
      title: 'Scopes',
    }
  },
  computed: {
    ...mapGetters('accounts', ['account']),
  },
})
export default class ScopePageComponent extends Vue {
  @Prop() scopeId!: number
  @scopesModule.Getter('scopes') scopes!: Scope[]

  async beforeMount() {
    await scopesStore.getScopes({ page: 1 })
  }

  get scope() {
    return this.scopes && this.scopes.find((r) => r.id === this.scopeId)
  }
}
</script>
