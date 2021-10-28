<template>
  <div class="container mx-auto">
    <template v-if="scope">
      <div class="flex">
        <div class="text-left">
          <div>
            <span class="text-2xl">{{ scope.name }}</span>
          </div>
          <div>
            <span class="text-sm">{{ scope.domain }}</span>
          </div>
          <p class="text-sm text-grey-dark">{{ scope.description }}</p>
        </div>
        <div>
          <nuxt-link :to="{ path: `/scopes/${scope.id}/edit` }" class="ml-3 btn btn-xs normal-case">編集</nuxt-link>
        </div>
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
              <h1>
                <input
                  v-model="updateReleaseDto.name"
                  type="text"
                  placeholder="Release name"
                  class="input font-semibold text-xl px-1"
                  @change="updateRelease"
                />
              </h1>
            </div>
            <div class="flex-initial">
              <span v-if="release.releasedAt" class="badge badge-success text-xl">公開中</span>
              <span v-else class="badge badge-info text-xl">公開前</span>
            </div>
          </div>

          <div class="my-3">
            <div v-for="content in contentHistories" :key="content.id" class="bg-grey-lighter p-6 mb-6 rounded-box">
              <div class="flex">
                <div class="flex-grow">
                  <span class="text-lg font-semibold bg-white rounded-box p-3">{{ content.path }}</span>
                  <span class="ml-3">ページに対して、</span>
                </div>
                <div class="flex-col">
                  <button class="btn btn-warning btn-sm" @click.prevent="openContentHistoryModal(content)">編集</button>
                  <a
                    v-if="scope.domain"
                    :href="`${scope.domain}${content.path}`"
                    target="_blank"
                    class="btn btn-sm ml-3"
                    :class="{ 'btn-disabled': !scope.domain || !content.path }"
                    >限定公開で確認</a
                  >
                  <nuxt-link v-else :to="{ path: `/scopes/${scope.id}/edit` }" class="ml-3 btn btn-sm"
                    >ドメインの登録してください</nuxt-link
                  >
                </div>
              </div>
              <div class="mt-4 bg-white p-3 rounded-box">{{ content.selector }}</div>
              <div class="my-5">
                で指定されるHTMLElementの
                <span class="bg-white p-3 rounded-box">{{ actionLabels[content.action] }}</span>
                <span class="mx-3">Actionを発動します。</span>
              </div>
              <div class="mt-3">HTMLデータは下記</div>
              <div v-if="content.content" class="bg-white p-4 rounded-box">
                <pre>{{ content.content }}</pre>
              </div>
            </div>

            <div class="my-6">
              <button class="btn btn-primary btn-block tracking-widest" @click.prevent="openContentHistoryModal(null)">
                コンテンツの追加
              </button>
            </div>
          </div>

          <div class="my-6">
            <h2 class="font-semibold text-xl">動作させるには？</h2>
            <div>
              <p class="">CMS機能を活用したい各htmlページのheadタグに下記のscriptタグを必ず設置してください。</p>
            </div>
            <div class="my-3">
              <!-- eslint-disable-next-line vue/no-v-html -->
              <code class="p-6 font-mono text-xs rounded-box html" v-html="attachmentCode"> </code>
            </div>
          </div>

          <div class="my-3 flex justify-between">
            <button class="btn btn-primary mr-3" @click="createRelease">一般公開する</button>
            <button class="btn btn-error" @click="deleteRelease">リリースを削除する</button>
          </div>
        </div>
      </div>
    </template>

    <content-history-modal
      v-if="contentHistoryModal.open"
      :release-id="releaseId"
      :scope-id="scopeId"
      :content-history="contentHistoryModal.record"
      @close="contentHistoryModal.open = false"
    ></content-history-modal>
  </div>
</template>

<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import { NavigationGuardNext, Route } from 'vue-router/types'
import ContentHistoryModal from './-content-history-modal.vue'
import { scopesStore, releasesStore, contentHistoriesStore } from '~/store'
import { CreateReleaseDto, UpdateReleaseDto } from '~/types/attachment-cms-server/app/scopes/dto/release.dto'
import { Release } from '~/types/attachment-cms-server/db/entity/release.entity'
import { Scope } from '~/types/attachment-cms-server/db/entity/scope.entity'
import { Form } from '~/utils/form'
import FormValidation from '~/components/form-validation.vue'
import { convertToDtoWithForm } from '~/utils/object'
import { eventBus } from '~/utils/event-bus'
import { ContentHistory } from '~/types/attachment-cms-server/db/entity/content-history.entity'
import { ConfirmationCloseError } from '~/components/confirmation.vue'
import { LABELS } from '~/services/labels'

const attachmentScript = (token: string) => {
  return `&lt;script src=&quot;https://localhost:3001/lib/acms.js?token=${token}&quot;&gt;&lt;/script&gt;`
}

@Component({
  components: { FormValidation, ContentHistoryModal },
})
export default class ReleasePage extends Form {
  // State
  createReleaseDto: CreateReleaseDto = { name: '', scopeId: null, sourceReleaseId: null }
  updateReleaseDto: UpdateReleaseDto = { id: null, name: '' }
  contentHistoryModal: Record<string, ContentHistory | boolean> = {
    open: false,
    record: null,
  }

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

  async beforeRouteUpdate(to: Route, from: Route, next: NavigationGuardNext) {
    const releaseId = parseInt(to.params.release_id)

    if (releaseId) {
      this.fetchData(releaseId)
      next()
    } else {
      const scopeId = parseInt(to.params.id)
      let latestRelease = releasesStore.getLatestRelease(scopeId)
      if (!latestRelease) await releasesStore.fetchReleases({})
      latestRelease = releasesStore.getLatestRelease(scopeId)
      if (latestRelease) {
        next({ path: `/scopes/${scopeId}/releases/${latestRelease.id}` })
      } else {
        next()
      }
    }
  }

  created() {
    super.initializeForm()
  }

  async beforeMount() {
    if (this.releaseId) {
      this.fetchData(this.releaseId)
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

  get contentHistories(): ContentHistory[] {
    return contentHistoriesStore.contentHistories
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

  get actionLabels(): Record<string, string> {
    return LABELS.contentHistory.action
  }

  // methods
  head() {
    return {
      title: this.title,
    }
  }

  async fetchData(releaseId: number) {
    const release = releaseId && releasesStore.getRelease(releaseId)
    const promise1: Promise<void | Release[]> = release ? Promise.resolve() : releasesStore.fetchReleases({})
    const promise2: Promise<void | ContentHistory[]> = releaseId
      ? contentHistoriesStore.fetchContentHistories(releaseId)
      : Promise.resolve()
    await Promise.all([promise1, promise2])
    this.resetForm()
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

  async deleteRelease() {
    try {
      await eventBus.confirm({ title: 'このリリースを削除しても良いですか？' })
      await releasesStore.deleteRelease(this.releaseId)
      this.$router.replace({ path: `/scopes/${this.scopeId}/releases` })
    } catch (err) {
      if (err instanceof ConfirmationCloseError) return
      throw err
    }
  }

  openContentHistoryModal(record: ContentHistory) {
    this.contentHistoryModal.record = record
    this.contentHistoryModal.open = true
  }
}
</script>
