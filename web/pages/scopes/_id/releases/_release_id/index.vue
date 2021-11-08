<template>
  <div class="container mx-auto p-2">
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

      <div class="flex justify-between mt-6">
        <button v-if="hasPrevRelease" class="" @click="goPrevRelease">
          <font-awesome-icon :icon="['fas', 'chevron-circle-left']" class="text-2xl" /><br />
          <span>Prev</span>
        </button>
        <div v-else></div>
        <button v-if="hasNextRelease" class="" @click="goNextRelease">
          <font-awesome-icon :icon="['fas', 'chevron-circle-right']" class="text-2xl" /><br />
          <span>Next</span>
        </button>
        <div v-else></div>
      </div>
      <div v-if="release" class="card shadow-md">
        <div class="card-body">
          <div class="flex">
            <div class="flex-1 form-control">
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
            <div class="flex-initial">
              <span v-if="isLatest && !release.releasedAt" class="badge badge-lg badge-warning text-2xl">公開前</span>
              <span v-else-if="isLatest" class="badge badge-lg badge-success text-2xl">公開中</span>
              <span v-else class="badge badge-lg badge-info text-2xl">公開終了</span>
            </div>
          </div>

          <div class="my-3">
            <div v-for="content in contentHistories" :key="content.id" class="bg-grey-lighter p-6 mb-6 rounded-box">
              <div class="flex">
                <div class="flex-grow">
                  <span class="text-xl font-semibold bg-white rounded-box p-3">{{ content.path }}</span>
                  <span class="ml-3">ページの</span>
                  <span class="ml-6 font-semibold">{{ content.description }}</span>
                </div>
                <div class="flex-col">
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
              <div class="my-5">
                で指定されるHTMLElementに対して
                <span class="bg-white p-3 rounded-box">{{ actionLabels[content.action] }}</span>
                <span class="mx-3">Actionを発動します。</span>
              </div>
              <template v-if="content.content">
                <div class="mt-3">
                  <span>Actionで利用されるHTMLデータ</span>
                </div>
                <div class="bg-white p-4 rounded-box">
                  <pre>{{ content.content }}</pre>
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
            <h2 class="font-semibold text-xl">動作させるには？</h2>
            <div>
              <p class="">CMS機能を活用したい各htmlページのheadタグに下記のscriptタグを必ず設置してください。</p>
            </div>
            <div class="my-3">
              <!-- eslint-disable-next-line vue/no-v-html -->
              <code class="p-6 font-mono text-xs rounded-box html" v-html="attachmentCode"> </code>
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

const attachmentScript = (token: string) => {
  return `&lt;script src=&quot;https://localhost:3001/lib/acms.js?token=${token}&quot;&gt;&lt;/script&gt;`
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

  get attachmentCode(): string {
    if (!this.scope) return ''
    return attachmentScript(this.scope.token)
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
