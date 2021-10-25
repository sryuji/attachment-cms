<template>
  <div class="container mx-auto">
    <h1>Scope List</h1>
    <div v-for="scope in scopes" :key="scope.id" class="card shadow-md m-3">
      <nuxt-link class="text-xl" :to="{ path: `scopes/${scope.id}/releases/` }">
        <div class="card-body text-center">
          {{ scope.name }}
        </div>
      </nuxt-link>
    </div>
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
export default class ScopeListPage extends Vue {
  @scopesModule.State('scopes') scopes: Scope[]

  async beforeMount() {
    await scopesStore.fetchScopes({})
    if (!scopesStore.hasScopes) this.$router.replace({ name: 'scopes-new' })
  }
}
</script>
