<template>
  <div class="container mx-auto">
    <template v-if="scope">
      <div class="text-left">
        <div>
          <span class="text-2xl">{{ scope.name }}</span>
        </div>
        <div>
          <span class="text-sm">{{ scope.domain }}</span>
        </div>
        <p class="text-sm text-grey-dark">{{ scope.description }}</p>
      </div>

      <div v-if="!release || release.releasedAt" class="card shadow-md my-3">
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
          <div>
            <button class="btn btn-primary my-3" @click="createRelease">登録</button>
          </div>
        </div>
      </div>

      <div v-if="release" class="card shadow-md my-3">
        <div class="card-body">
          <div class="flex">
            <div class="flex-1 form-control">
              <input
                v-model="updateReleaseDto.name"
                type="text"
                placeholder="Release name"
                class="input font-semibold text-xl px-1"
                @change="updateRelease"
              />
            </div>
            <div class="flex-initial">
              <span v-if="release.releasedAt" class="badge badge-success">公開中</span>
              <span v-else class="badge badge-info">公開前</span>
            </div>
          </div>

          <div class="my-3"></div>

          <div class="my-6">
            <div>
              <p class="">CMS機能を活用したい各htmlページのheadタグに下記のscriptタグを必ず設置してください。</p>
            </div>
            <div class="my-3">
              <!-- eslint-disable-next-line vue/no-v-html -->
              <code class="p-6 font-mono text-xs rounded-box html" v-html="attachmentCode"> </code>
            </div>
          </div>

          <div class="my-3">
            <button class="btn btn-primary" @click="createRelease">一般公開する</button>
            <a href="" class="btn mx-8">限定公開で確認する</a>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import { NavigationGuardNext, Route } from 'vue-router/types'
import { scopesStore, releasesStore } from '~/store'
import { CreateReleaseDto, UpdateReleaseDto } from '~/types/attachment-cms-server/app/scopes/dto/release.dto'
import { Release } from '~/types/attachment-cms-server/db/entity/release.entity'
import { Scope } from '~/types/attachment-cms-server/db/entity/scope.entity'
import { Form } from '~/utils/form'
import FormValidation from '~/components/form-validation.vue'
import { convertToDtoWithForm } from '~/utils/object'
import { eventBus } from '~/utils/event-bus'

const attachmentScript = (token: string) => {
  return `&lt;script src=&quot;https://localhost:3001/lib/acms.js?token=${token}&quot;&gt;&lt;/script&gt;`
}

@Component({
  components: { FormValidation },
})
export default class ReleasePage extends Form {
  // State
  createReleaseDto: CreateReleaseDto = { name: '', scopeId: null, sourceReleaseId: null }
  updateReleaseDto: UpdateReleaseDto = { id: null, name: '' }

  // Lifecycle hooks
  beforeRouteEnter(to: Route, from: Route, next: NavigationGuardNext) {
    const releaseId = to.params.release_id
    if (releaseId) return next()

    const scopeId = parseInt(to.params.id)
    const latestRelease = releasesStore.getLatestRelease(scopeId)
    if (latestRelease) {
      next({ path: `/scopes/${scopeId}/releases/${latestRelease.id}` })
    } else {
      next()
    }
  }

  created() {
    super.initializeForm()
  }

  async beforeMount() {
    if (this.releaseId) {
      !this.release && (await releasesStore.fetchReleases({}))
      this.resetForm()
    } else {
      !this.latestRelease && (await releasesStore.fetchReleases({}))
      this.latestRelease && this.$router.replace({ path: `/scopes/${this.scopeId}/releases/${this.latestRelease.id}` })
    }
  }

  beforeDestroy() {
    super.finalizeForm()
  }

  // Getters
  get releases() {
    return releasesStore.releases.filter((r: Release) => r.scopeId === this.scopeId)
  }

  get release(): Release {
    if (!this.releaseId) return null
    return releasesStore.getRelease(this.releaseId)
  }

  get latestRelease(): Release {
    return releasesStore.getLatestRelease(this.scopeId)
  }

  get scope(): Scope {
    return scopesStore.getScope(this.scopeId)
  }

  get releaseId(): number {
    const id = this.$route.params.release_id
    if (id) return parseInt(id)
    return null
  }

  get scopeId(): number {
    return parseInt(this.$route.params.id)
  }

  get title(): string {
    return this.release ? this.release.name : 'Create next Release'
  }

  get attachmentCode(): string {
    if (!this.scope) return ''
    return attachmentScript(this.scope.token)
  }

  // methods
  head() {
    return {
      title: this.title,
    }
  }

  resetForm() {
    if (this.release) this.updateReleaseDto = convertToDtoWithForm(this.release, this.updateReleaseDto)
  }

  async createRelease() {
    if (!this.validateAll()) return
    this.createReleaseDto.scopeId = this.scopeId
    this.createReleaseDto.sourceReleaseId = this.releaseId
    const release = await releasesStore.createRelease({ release: this.createReleaseDto })
    this.$router.replace({ path: `/scopes/${this.scopeId}/releases/${release.id}` })
  }

  async updateRelease() {
    await releasesStore.updateRelease({ release: this.updateReleaseDto })
    this.resetForm()
    eventBus.notifyMessages('保存しました。')
  }
}
</script>
