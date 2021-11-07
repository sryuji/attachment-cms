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

      <div v-if="release" class="card shadow-md my-3">
        <div class="card-body">
          <div class="flex">
            <div class="flex-1 form-control">
              <h1 class="input font-semibold text-xl px-1">
                {{ release.name }}
              </h1>
            </div>
            <div class="flex-initial">
              <span v-if="release.releasedAt" class="badge badge-success text-xl">公開中</span>
              <span v-else class="badge badge-info text-xl">公開前</span>
            </div>
          </div>

          <div class="my-6">
            <p>下記の点を注意した上で、一般公開を行ってください。</p>
            <ul class="list-disc ml-6">
              <li>xxxxx</li>
            </ul>
          </div>

          <div class="my-3 flex justify-between">
            <button class="btn btn-error mr-3" @click.prevent="publish">一般公開する</button>
            <button class="btn" @click="goBack">戻る</button>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import { scopesStore, releasesStore } from '~/store'
import { PublishReleaseDto } from '~/types/attachment-cms-server/app/scopes/dto/release.dto'
import { Release } from '~/types/attachment-cms-server/db/entity/release.entity'
import { Scope } from '~/types/attachment-cms-server/db/entity/scope.entity'
import { Form } from '~/utils/form'
import FormValidation from '~/components/form-validation.vue'
import { convertToDtoWithForm } from '~/utils/object'
import { eventBus } from '~/utils/event-bus'
import { ConfirmationCloseError } from '~/components/confirmation.vue'
import { RouteCoordinator } from '~/utils/route-coordinator'

@Component({
  components: { FormValidation },
})
export default class PublishReleasePage extends Form {
  // State
  releaseDto: PublishReleaseDto = { id: null, releasedAt: null }
  routeCoordinator: RouteCoordinator

  // Lifecycle hooks
  created() {
    super.initializeForm()
  }

  beforeMount() {
    this.routeCoordinator = this.routeCoordinator || new RouteCoordinator(this)

    this.fetchData(this.releaseId)
  }

  beforeDestroy() {
    super.finalizeForm()
  }

  // Getters
  get release(): Release {
    return releasesStore.getRelease(this.releaseId)
  }

  get scope(): Scope {
    return scopesStore.getScope(this.scopeId)
  }

  get releaseId(): number {
    return parseInt(this.$route.params.release_id)
  }

  get scopeId(): number {
    return parseInt(this.$route.params.id)
  }

  get title(): string {
    return this.release && `一般公開の手続き - ${this.release.name}`
  }

  // methods
  head() {
    return {
      title: this.title,
    }
  }

  async fetchData(releaseId: number) {
    const release = releasesStore.getRelease(releaseId)
    if (!release) await releasesStore.fetchRelease(releaseId)
    this.resetForm()
  }

  resetForm() {
    if (this.release) this.releaseDto = convertToDtoWithForm(this.release, this.releaseDto)
  }

  goBack() {
    this.routeCoordinator.backPage({ path: `/scopes/${this.scopeId}/releases/${this.releaseId}` })
  }

  async publish() {
    try {
      await eventBus.confirm({ title: 'このリリースを一般公開しても良いですか？' })
      await releasesStore.publishRelease({ release: this.releaseDto })
      eventBus.notifyMessages('このリリースを一般公開しました。', 'success')
      this.$router.push({ path: `/scopes/${this.scopeId}/releases/${this.releaseId}` })
    } catch (err) {
      if (err instanceof ConfirmationCloseError) return
      throw err
    }
  }
}
</script>
