<template>
  <div class="container mx-auto p-2">
    <h1>Project List</h1>
    <div v-for="scope in scopes" :key="scope.id" class="card shadow-md m-6 bg-indigo-lightest">
      <button class="text-xl" @click.prevent="moveLatestRelease(scope.id)">
        <div class="card-body text-center font-semibold">
          {{ scope.name }}
        </div>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, namespace, Vue } from 'nuxt-property-decorator'
import { scopesStore } from '~/store'
import { Scope } from '~/types/attachment-cms-server/db/entity/scope.entity'
import { sendToAcmsRuntime } from '~/utils/chrome-extension'
import { waitUntilValueComes } from '~/utils/vue-helper'

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
    await waitUntilValueComes(() => scopesStore.hasScopes)
    if (!scopesStore.hasScopes) this.$router.replace({ name: 'scopes-new' })
  }

  moveLatestRelease(scopeId: number) {
    this.$router.push({ path: `/scopes/${scopeId}/releases/` })
    const data = { type: 'SelectScope', scopeId }
    sendToAcmsRuntime(data)
  }
}
</script>
