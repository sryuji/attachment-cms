<template>
  <div class="container mx-auto py-2"></div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { NavigationGuardNext, Route } from 'vue-router/types'
import { releasesStore } from '~/store'
import { Release } from '~/types/attachment-cms-server/db/entity/release.entity'

@Component({
  components: {},
})
export default class ReleasePage extends Vue {
  // Lifecycle hooks
  beforeRouteEnter(to: Route, from: Route, next: NavigationGuardNext) {
    const scopeId = parseInt(to.params.id)
    releasesStore.cleanOtherScope(scopeId)

    const latestRelease = releasesStore.latestRelease
    if (latestRelease) {
      return next({ path: `/scopes/${scopeId}/releases/${latestRelease.id}` })
    }
    next()
  }

  async beforeMount() {
    await this.$nextTick()
    this.$nuxt.$loading.start()
    try {
      !this.latestRelease && (await releasesStore.fetchLatestRelease(this.scopeId))
      if (this.latestRelease) {
        this.$router.replace({ path: `/scopes/${this.scopeId}/releases/${this.latestRelease.id}` })
      } else {
        this.$router.replace({ path: `/scopes/${this.scopeId}/releases/new` })
      }
    } finally {
      this.$nuxt.$loading.finish()
    }
  }

  get latestRelease(): Release {
    return releasesStore.latestRelease
  }

  get scopeId(): number {
    return parseInt(this.$route.params.id)
  }
}
</script>
