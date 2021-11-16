<template>
  <div class="container mx-auto py-2">
    <template v-if="scope && !$nuxt.$loading.loading">
      <scope-header :scope="scope"></scope-header>
      <div class="card-body">
        <h1 class="text-xl font-semibold">Create next Release</h1>
        <div class="form-control max-w-md">
          <label class="label">
            <div>
              <span class="label-text">name</span>
              <span class="badge badge-error">必須</span>
            </div>
          </label>
          <input v-model="createReleaseDto.name" type="text" placeholder="" class="input input-bordered" />
          <form-validation :value="createReleaseDto.name" rules="required" />
        </div>
        <div class="flex justify-between">
          <button class="btn btn-primary my-3" @click="createRelease">登録</button>
          <nuxt-link v-if="latestRelease" class="btn" :to="{ path: `/scopes/${scopeId}/releases/${latestRelease.id}` }"
            >最新のリリースへ</nuxt-link
          >
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import { NavigationGuardNext, Route } from 'vue-router/types'
import ScopeHeader from '../-scope-header.vue'
import { scopesStore, releasesStore } from '~/store'
import { CreateReleaseDto } from '~/types/attachment-cms-server/app/scopes/dto/release.dto'
import { Release } from '~/types/attachment-cms-server/db/entity/release.entity'
import { Scope } from '~/types/attachment-cms-server/db/entity/scope.entity'
import { Form } from '~/utils/form'
import FormValidation from '~/components/form-validation.vue'
import { ContentHistory } from '~/types/attachment-cms-server/db/entity/content-history.entity'

@Component({
  components: { FormValidation, ScopeHeader },
})
export default class ReleasePage extends Form {
  // State
  createReleaseDto: CreateReleaseDto = { name: '', scopeId: null, sourceReleaseId: null }
  contentHistoryModal: Record<string, ContentHistory | boolean> = {
    open: false,
    record: null,
  }

  // Lifecycle hooks
  beforeRouteEnter(to: Route, from: Route, next: NavigationGuardNext) {
    const scopeId = parseInt(to.params.id)
    releasesStore.cleanOtherScope(scopeId)
    const latestRelease = releasesStore.latestRelease
    if (latestRelease && !latestRelease.releasedAt) {
      next({ path: `/scopes/${scopeId}/releases/${latestRelease.id}` })
    } else {
      next()
    }
  }

  async beforeRouteUpdate(to: Route, from: Route, next: NavigationGuardNext) {
    const scopeId = parseInt(to.params.id)
    releasesStore.cleanOtherScope(scopeId)
    if (!releasesStore.latestRelease) await releasesStore.fetchLatestRelease(scopeId)
    if (releasesStore.latestRelease && !releasesStore.latestRelease.releasedAt) {
      next({ path: `/scopes/${scopeId}/releases/${releasesStore.latestRelease.id}` })
    } else {
      next()
    }
  }

  created() {
    super.initializeForm()
  }

  async beforeMount() {
    await this.$nextTick()
    this.$nuxt.$loading.start()
    try {
      !this.latestRelease && (await releasesStore.fetchLatestRelease(this.scopeId))
      if (this.latestRelease && !this.latestRelease.releasedAt) {
        this.$router.replace({ path: `/scopes/${this.scopeId}/releases/${this.latestRelease.id}` })
      }
    } finally {
      this.$nuxt.$loading.finish()
    }
  }

  beforeDestroy() {
    super.finalizeForm()
  }

  // Getters
  get releases() {
    return releasesStore.releases.filter((r: Release) => r.scopeId === this.scopeId)
  }

  get latestRelease(): Release {
    return releasesStore.latestRelease
  }

  get scope(): Scope {
    return scopesStore.getScope(this.scopeId)
  }

  get scopeId(): number {
    return parseInt(this.$route.params.id)
  }

  get title(): string {
    return 'Create next Release'
  }

  // methods
  head() {
    return {
      title: this.title,
    }
  }

  async createRelease() {
    if (!this.validateAll()) return
    this.createReleaseDto.scopeId = this.scopeId
    this.createReleaseDto.sourceReleaseId = this.latestRelease ? this.latestRelease.id : null
    const release = await releasesStore.createRelease({ release: this.createReleaseDto })
    this.$router.replace({ path: `/scopes/${this.scopeId}/releases/${release.id}` })
  }
}
</script>
