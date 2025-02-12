<template>
  <div class="container mx-auto p-2">
    <template v-if="scope">
      <scope-header :scope="scope"></scope-header>

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
            <div class="flex-grow form-control mr-6">
              <h1>
                <input
                  v-if="!release.releasedAt"
                  v-model="updateReleaseDto.name"
                  type="text"
                  placeholder="Release name"
                  class="input font-semibold text-xl px-1 w-full"
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

          <div
            class="mt-3 flex justify-between items-center rounded-box border-2 border-indigo-light bg-indigo-lighter text-indigo-dark font-semibold"
          >
            <div class="form-control flex-row p-2 pr-6">
              <label class="mx-3">
                <span class="label-text align-bottom">Pathで検索</span>
              </label>
              <input
                v-model="condition.path"
                type="text"
                placeholder="/pathで検索"
                class="input input-bordered input-sm w-80"
                @change="searchContentHistories(releaseId)"
              />
            </div>
            <div class="form-control pl-3 pr-1">
              <label class="cursor-pointer label">
                <span class="label-text">全て表示</span>
                <input
                  v-model="condition.isUpdated"
                  type="checkbox"
                  class="toggle toggle-primary mx-3"
                  :true-value="true"
                  :false-value="null"
                  @change="searchContentHistories(releaseId)"
                />
                <span class="label-text mr-3">更新済のみ表示</span>
              </label>
            </div>
          </div>

          <div class="my-3">
            <div v-for="content in contentHistories" :key="content.id">
              <content-component
                :content="content"
                :latest-release="latestRelease"
                :release="release"
                :scope="scope"
                @show-website="showWebsite"
                @open-content-history-modal="openContentHistoryModal"
              ></content-component>
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
              <pre> <code class="p-6 font-mono text-xs rounded-box html" v-html="attachmentEsCode"> </code> </pre>
            </div>
          </div>

          <div v-if="!release.releasedAt" class="my-3 flex justify-between">
            <button
              v-if="scope.domain && contentHistories.length > 0"
              class="btn btn-warning mr-3"
              @click.prevent="publish"
            >
              一般公開する
            </button>
            <div v-else></div>

            <button class="btn btn-error" @click="deleteRelease">リリースを削除する</button>
          </div>
          <div v-else-if="release.releasedAt && release.id === latestRelease.id" class="my-3 flex justify-between">
            <button class="btn btn-warning mr-3" @click.prevent="rollback">リリースを１つ戻す</button>
          </div>
        </div>
      </div>

      <div v-if="isLatest && latestRelease.releasedAt" class="card shadow-md my-3">
        <div class="card-body">
          <nuxt-link
            :to="{ path: `/scopes/${scope.id}/releases/new` }"
            class="btn btn-primary btn-block tracking-widest"
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
    <confirmation-modal ref="urlConfirmation" v-slot="{ data }" title="URLを入力してください。">
      <div>
        <div>
          <p class="">* を利用したPath入力した場合、有効なURLを入力して頂く必要があります。</p>
        </div>
        <div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">URL</span>
              <span class="badge badge-error">必須</span>
            </label>
            <input v-model="data.url" type="text" class="input input-bordered" />
            <!-- https://developer.mozilla.org/ja/docs/web/java-script/guide/Regular_Expressions#escaping -->
            <form-validation
              :value="data.url"
              :rules="['required', 'http_protocol', 'regex:/^(?!.*\\*).+$/']"
              :error-messages="{ regex: '* を含まない正しいURLに書き換えてください。' }"
            />
          </div>
        </div>
      </div>
    </confirmation-modal>
  </div>
</template>

<script lang="ts">
import { Component, namespace, Ref } from 'nuxt-property-decorator'
import { NavigationGuardNext, Route } from 'vue-router/types'
import ScopeHeader from '../../-scope-header.vue'
import ContentHistoryModal from './-content-history-modal.vue'
import ContentComponent from './~content.vue'
import { scopesStore, releasesStore, contentHistoriesStore } from '~/store'
import { UpdateReleaseDto } from '~/types/attachment-cms-server/app/scopes/dto/release.dto'
import { Release } from '~/types/attachment-cms-server/db/entity/release.entity'
import { Scope } from '~/types/attachment-cms-server/db/entity/scope.entity'
import { Form } from '~/utils/form'
import FormValidation from '~/components/form-validation.vue'
import { convertToDtoWithForm } from '~/utils/object'
import { eventBus } from '~/utils/event-bus'
import { ContentHistory } from '~/types/attachment-cms-server/db/entity/content-history.entity'
import { ConfirmationCloseError } from '~/utils/errors'
import ConfirmationModal from '~/components/confirmation-modal.vue'
import { attachmentEsScript, attachmentUmdScript } from '~/services/constants'
import { RouteCoordinator } from '~/utils/route-coordinator'
import { hasExtension, sendToAcmsRuntime } from '~/utils/chrome-extension'

const releasesModule = namespace('releases')

@Component({
  components: { FormValidation, ContentHistoryModal, ContentComponent, ScopeHeader, ConfirmationModal },
})
export default class ReleasePage extends Form {
  // State
  updateReleaseDto: UpdateReleaseDto = { id: null, name: '' }
  contentHistoryModal: Record<string, ContentHistory | boolean> = {
    open: false,
    record: null,
  }

  condition = { path: '', isUpdated: null as boolean }
  installationTab: 'umd' | 'es' = 'umd'
  routeCoordinator: RouteCoordinator

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
    this.routeCoordinator = this.routeCoordinator || new RouteCoordinator(this)
    this.routeCoordinator.setQueryToState(this.condition)
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

  @releasesModule.Getter('hasNextRelease') hasNextRelease: boolean
  @releasesModule.Getter('hasPrevRelease') hasPrevRelease: boolean
  @releasesModule.Getter('page') page: number
  @Ref() readonly urlConfirmation!: ConfirmationModal<Record<'url', string>>

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
    const promise2: Promise<void | ContentHistory[]> = this.searchContentHistories(releaseId)
    await Promise.all([promise1, promise2])
    this.resetForm()
  }

  async searchContentHistories(releaseId: number) {
    await this.$nextTick()
    this.$nuxt.$loading.start()
    try {
      await contentHistoriesStore.fetchContentHistories({ releaseId, condition: this.condition })
      this.routeCoordinator.replaceQuery(this.condition)
    } finally {
      this.$nuxt.$loading.finish()
    }
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
      await eventBus.confirm({ title: 'このリリースを削除しても良いですか？', style: 'error' })
      await releasesStore.deleteRelease(this.releaseId)
      const baseNextPath = `/scopes/${this.scopeId}/releases`
      const nextPath = this.latestRelease ? `${baseNextPath}/${this.latestRelease.id}` : `${baseNextPath}/new`
      this.$router.replace({ path: nextPath })
    } catch (err) {
      if (err instanceof ConfirmationCloseError) return
      throw err
    }
  }

  openContentHistoryModal(record: ContentHistory) {
    this.contentHistoryModal.record = record
    this.contentHistoryModal.open = true
  }

  async showWebsite(contentHistoryId: number, path: string) {
    if (!this.isLatest)
      throw new Error(`This release is NOT LATEST. showWebsite method is used by only latest release.`)

    try {
      let url = `${this.scope.domain}${path}`
      if (path.match(/\*/)) {
        let data = { url }
        data = await this.urlConfirmation.confirm(data)
        const urlParser = new URL(data.url)
        path = urlParser.pathname
        url = `${urlParser.origin}${path}`
      }
      if (hasExtension()) {
        sendToAcmsRuntime({
          type: 'SelectContent',
          scopeId: this.scopeId,
          releaseId: this.releaseId,
          limitedReleaseToken: this.release.limitedReleaseToken,
          url,
          contentHistoryId,
        })
      } else {
        if (!this.release.releasedAt) url += `?acmst=${this.release.limitedReleaseToken}`
        window.open(url, '_blank')
      }
    } catch (err) {
      if (err instanceof ConfirmationCloseError) return
      throw err
    }
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

  async publish() {
    try {
      await eventBus.confirm({ title: 'このリリースを一般公開しても良いですか？', style: 'warning' })
      await releasesStore.publishRelease({ release: { id: this.releaseId } })
      eventBus.notifyMessages('このリリースを一般公開しました。', 'success')
    } catch (err) {
      if (err instanceof ConfirmationCloseError) return
      throw err
    }
  }

  async rollback() {
    try {
      await eventBus.confirm({
        title: 'このリリースを一般公開を停止し、１つ前のリリースを一般公開して良いですか？',
        style: 'warning',
      })
      await releasesStore.rollbackRelease(this.releaseId)
      eventBus.notifyMessages('このリリースの一般公開を停止しました。', 'success')
    } catch (err) {
      if (err instanceof ConfirmationCloseError) return
      throw err
    }
  }
}
</script>
