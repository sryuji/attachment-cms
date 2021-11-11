<template>
  <div class="container mx-auto p-2">
    <template v-if="scope">
      <div class="flex">
        <div class="text-left flex-col">
          <div>
            <span class="text-2xl">{{ scope.name }}</span>
          </div>
          <div>
            <span class="text-sm">{{ scope.domain }}</span>
          </div>
          <p class="text-sm text-grey-dark">{{ scope.description }}</p>
        </div>
        <div class="flex-shrink-0">
          <nuxt-link :to="{ path: `/scopes/${scope.id}/edit` }" class="ml-3 btn btn-sm normal-case">編集</nuxt-link>
        </div>
        <div class="flex-shrink-0">
          <nuxt-link :to="{ path: `/scopes/${scope.id}/member` }" class="ml-3 btn btn-sm normal-case"
            >メンバー</nuxt-link
          >
        </div>
      </div>

      <div class="flex justify-between mt-6 mx-3">
        <button v-if="hasPrevRelease" class="" @click="goPrevRelease">
          <font-awesome-icon :icon="['fas', 'chevron-circle-left']" class="text-2xl" /><br />
          <span>Next</span>
        </button>
        <div v-else></div>
        <button v-if="hasNextRelease" class="" @click="goNextRelease">
          <font-awesome-icon :icon="['fas', 'chevron-circle-right']" class="text-2xl" /><br />
          <span>Prev</span>
        </button>
        <div v-else></div>
      </div>
      <div v-if="release" class="card shadow-md">
        <div class="card-body">
          <div class="flex flex-wrap items-center">
            <div v-if="release.releasedAt" class="flex-shrink-0 mr-6 badge badge-success h-8 p-3">
              <div class="">
                <span class="text-lg font-semibold">{{ release.releasedAt | formatDate('yy/MM/dd') }}</span>
                <span class="text-sm leading-none"> release</span>
              </div>
            </div>
            <div class="flex-grow form-control">
              <h1>
                <input
                  v-if="!release.releasedAt"
                  v-model="updateReleaseDto.name"
                  type="text"
                  placeholder="Release name"
                  class="input font-semibold text-xl px-1"
                  @change="updateRelease"
                />
                <span v-else class="font-semibold text-xl">{{ release.name }}</span>
              </h1>
            </div>
            <div class="flex-shrink-0">
              <span v-if="isLatest && !release.releasedAt" class="badge badge-lg badge-warning text-2xl">公開前</span>
              <span v-else-if="isLatest" class="badge badge-lg badge-success text-2xl">公開中</span>
              <span v-else class="badge badge-lg badge-info text-2xl">公開終了</span>
            </div>
          </div>

          <div class="my-3">
            <div v-for="content in contentHistories" :key="content.id" class="bg-grey-lighter p-6 mb-6 rounded-box">
              <div class="flex flex-wrap">
                <div class="flex-shrink-0">
                  <span class="text-xl font-semibold bg-white rounded-box p-3">{{ content.path }}</span>
                  <span class="ml-3">ページの</span>
                </div>
                <div class="flex-1 ml-3">
                  <span class="font-semibold">{{ content.description }}</span>
                </div>
                <div
                  v-if="!release.releasedAt || release.id === latestRelease.id"
                  class="flex-shrink-0 ml-3 leading-10"
                >
                  <button class="btn btn-warning text-lg btn-sm" @click.prevent="openContentHistoryModal(content)">
                    編集
                  </button>
                  <nuxt-link v-if="!scope.domain" :to="{ path: `/scopes/${scope.id}/edit` }" class="ml-3 btn btn-sm"
                    >ドメインの登録してください</nuxt-link
                  >
                  <a
                    v-else-if="!release.releasedAt"
                    :href="`${scope.domain}${content.path}?token=${release.limitedReleaseToken}`"
                    target="_blank"
                    class="btn btn-sm ml-3"
                    :class="{ 'btn-disabled': !scope.domain || !content.path }"
                    >限定公開で確認</a
                  >
                </div>
              </div>
              <div class="mt-4 bg-white p-3 rounded-box">{{ content.selector }}</div>
              <div class="my-5 leading-9">
                <span>で指定されるHTMLElementに対して</span>
                <span class="bg-white p-3 rounded-box">{{ actionLabels[content.action] }}</span>
                <span class="mx-3">Actionを発動します。</span>
              </div>
              <template v-if="content.content">
                <div class="mt-3">
                  <span>Actionで利用されるHTMLデータ</span>
                </div>
                <div class="bg-white p-4 rounded-box">
                  <pre class="whitespace-pre-wrap">{{ content.content }}</pre>
                </div>
              </template>
            </div>

            <div v-if="!release.releasedAt" class="my-6">
              <button class="btn btn-primary btn-block tracking-widest" @click.prevent="openContentHistoryModal(null)">
                コンテンツの追加
              </button>
            </div>
          </div>

          <div v-if="!release.releasedAt" class="my-6">
            <h2 class="font-semibold text-xl">Installation to Homepage</h2>

            <div class="tabs mt-6">
              <a
                class="tab tab-lifted"
                :class="{ 'tab-active': installationTab === 'umd' }"
                @click.prevent.stop="installationTab = 'umd'"
                >script tag</a
              >
              <a
                class="tab tab-lifted"
                :class="{ 'tab-active': installationTab === 'es' }"
                @click.prevent.stop="installationTab = 'es'"
                >ES Module</a
              >
            </div>
            <div v-if="installationTab === 'umd'">
              <div class="mt-6">
                <p class="">CMS機能を活用したい各htmlページのheadタグに下記のscriptタグを設置してください。</p>
              </div>
              <!-- eslint-disable-next-line vue/no-v-html -->
              <pre> <code class="select-all p-6 font-mono text-xs rounded-box html" v-html="attachmentUmdCode"> </code> </pre>
            </div>
            <div v-if="installationTab === 'es'">
              <div class="mt-6">
                <p class="">webpackなどでmoduleを管理されている場合はこちらをご利用ください</p>
              </div>
              <!-- eslint-disable-next-line vue/no-v-html -->
              <pre> <code class="select-all p-6 font-mono text-xs rounded-box html" v-html="attachmentEsCode"> </code> </pre>
            </div>
          </div>

          <div v-if="!release.releasedAt" class="my-3 flex justify-between">
            <nuxt-link
              v-if="scope.domain"
              class="btn btn-primary mr-3"
              :to="{ path: `/scopes/${scopeId}/releases/${releaseId}/publish` }"
              >一般公開する</nuxt-link
            >
            <button class="btn btn-error" @click="deleteRelease">リリースを削除する</button>
          </div>
        </div>
      </div>

      <div v-if="isLatest && latestRelease.releasedAt" class="card shadow-md my-3">
        <div class="card-body">
          <nuxt-link :to="{ path: `/scopes/${scope.id}/releases` }" class="btn btn-primary btn-block tracking-widest"
            >次のリリースを作成</nuxt-link
          >
        </div>
      </div>
    </template>

    <content-history-modal
      v-if="contentHistoryModal.open"
      :release-id="releaseId"
      :scope-id="scopeId"
      :content-history="contentHistoryModal.record"
      :is-released="release && release.releasedAt"
      @close="contentHistoryModal.open = false"
    ></content-history-modal>
  </div>
</template>

<script lang="ts">
import { Component, namespace } from 'nuxt-property-decorator'
import { NavigationGuardNext, Route } from 'vue-router/types'
import ContentHistoryModal from './-content-history-modal.vue'
import { scopesStore, releasesStore, contentHistoriesStore } from '~/store'
import { UpdateReleaseDto } from '~/types/attachment-cms-server/app/scopes/dto/release.dto'
import { Release } from '~/types/attachment-cms-server/db/entity/release.entity'
import { Scope } from '~/types/attachment-cms-server/db/entity/scope.entity'
import { Form } from '~/utils/form'
import FormValidation from '~/components/form-validation.vue'
import { convertToDtoWithForm } from '~/utils/object'
import { eventBus } from '~/utils/event-bus'
import { ContentHistory } from '~/types/attachment-cms-server/db/entity/content-history.entity'
import { ConfirmationCloseError } from '~/components/confirmation.vue'
import { LABELS } from '~/services/labels'

const attachmentUmdScript = (token: string) => {
  return `
&lt;link rel="preconnect" href="https://api.attachment-cms.dev" crossorigin&gt;
&lt;script type="text/javascript"&gt;
  window.AttachmentConfig = { token: '0601c7e9-af0b-4e1d-a0e7-fde28278e9c2' }
&lt;/script&gt;
&lt;script async type="module" src="https://attachment-cms.dev/lib/attachment-cms-lib.umd.js?token=${token}"&gt;&lt;/script&gt;
  `
}
const attachmentEsScript = (token: string) => {
  return `
import { AttachmentCMS } from 'https://attachment-cms.dev/lib/attachment-cms-lib.es.js'

new AttachmentCMS({
  token: ${token},
}).run()
  `
}
const releasesModule = namespace('releases')

@Component({
  components: { FormValidation, ContentHistoryModal },
})
export default class ReleasePage extends Form {
  // State
  updateReleaseDto: UpdateReleaseDto = { id: null, name: '' }
  contentHistoryModal: Record<string, ContentHistory | boolean> = {
    open: false,
    record: null,
  }

  installationTab: 'umd' | 'es' = 'umd'

  // Lifecycle hooks
  beforeRouteEnter(to: Route, from: Route, next: NavigationGuardNext) {
    const scopeId = parseInt(to.params.id)
    releasesStore.cleanOtherScope(scopeId)
    next()
  }

  beforeRouteUpdate(to: Route, from: Route, next: NavigationGuardNext) {
    const scopeId = parseInt(to.params.id)
    releasesStore.cleanOtherScope(scopeId)
    const releaseId = parseInt(to.params.release_id)
    this.fetchData(releaseId)
    next()
  }

  created() {
    super.initializeForm()
  }

  beforeMount() {
    this.fetchData(this.releaseId)
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

  get isLatest(): boolean {
    return this.latestRelease && this.releaseId === this.latestRelease.id
  }

  get latestRelease(): Release {
    return releasesStore.latestRelease
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
    return this.release && this.release.name
  }

  get attachmentUmdCode(): string {
    if (!this.scope) return ''
    return attachmentUmdScript(this.scope.token)
  }

  get attachmentEsCode(): string {
    if (!this.scope) return ''
    return attachmentEsScript(this.scope.token)
  }

  get actionLabels(): Record<string, string> {
    return LABELS.contentHistory.action
  }

  @releasesModule.Getter('hasNextRelease') hasNextRelease: boolean
  @releasesModule.Getter('hasPrevRelease') hasPrevRelease: boolean
  @releasesModule.Getter('page') page: number

  // methods
  head() {
    return {
      title: this.title,
    }
  }

  async fetchData(releaseId: number) {
    // NOTE: 非同期で最新リリースは取得しにいく
    !this.latestRelease && releasesStore.fetchLatestRelease(this.scopeId)

    const release = releaseId && releasesStore.getRelease(releaseId)
    const promise1: Promise<void | Release> = release ? Promise.resolve() : releasesStore.fetchRelease(releaseId)
    const promise2: Promise<void | ContentHistory[]> = releaseId
      ? contentHistoriesStore.fetchContentHistories(releaseId)
      : Promise.resolve()
    await Promise.all([promise1, promise2])
    this.resetForm()
  }

  resetForm() {
    if (this.release) this.updateReleaseDto = convertToDtoWithForm(this.release, this.updateReleaseDto)
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

  async goNextRelease() {
    const releases = await releasesStore.fetchReleases({ scopeId: this.scopeId, page: this.page + 1 })
    const releaseId = releases[0].id
    this.$router.push({ path: `/scopes/${this.scopeId}/releases/${releaseId}` })
  }

  async goPrevRelease() {
    const releases = await releasesStore.fetchReleases({ scopeId: this.scopeId, page: this.page - 1 })
    const releaseId = releases[0].id
    this.$router.push({ path: `/scopes/${this.scopeId}/releases/${releaseId}` })
  }
}
</script>
