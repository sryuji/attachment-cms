<template>
  <div class="container mx-auto">
    <h1>Scopes</h1>
    <div v-for="scope in scopes" :key="scope.id" class="card shadow-md m-3">
      <nuxt-link class="text-xl" :to="{ name: 'scopes-id', params: { id: scope.id } }">
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
    await scopesStore.getScopes({ page: 1 })
  }
}
</script>
