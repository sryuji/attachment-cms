<template>
  <div>
    <div class="sm:flex sm:flex-wrap">
      <div class="flex-shrink-0">
        <span class="text-xl font-semibold bg-white rounded-box p-3">{{ content.path }}</span>
        <span class="ml-3">ページの</span>
      </div>
      <div class="flex-1 ml-3">
        <span class="font-semibold">{{ content.description }}</span>
      </div>
      <template v-if="isDisplayType(content.type)">
        <div
          v-if="!release.releasedAt || (latestRelease && release.id === latestRelease.id)"
          class="flex-shrink-0 ml-3 leading-10"
        >
          <button class="btn btn-warning text-lg btn-sm" @click.prevent="openContentHistoryModal(content)">編集</button>
          <nuxt-link v-if="!scope.domain" :to="{ path: `/scopes/${scope.id}/edit` }" class="ml-3 btn btn-sm"
            >ドメインの登録してください</nuxt-link
          >
          <a
            v-else
            class="btn btn-sm ml-3"
            :class="{ 'btn-disabled': !scope.domain || !content.path }"
            @click.prevent="showWebsite(content.path)"
          >
            <span v-if="!release.releasedAt">プレビュー</span>
            <span v-else>サイトを確認</span>
          </a>
        </div>
      </template>
    </div>
    <template v-if="isDisplayType(content.type)">
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
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'nuxt-property-decorator'
import FormValidation from '~/components/form-validation.vue'
import { ContentHistory } from '~/types/attachment-cms-server/db/entity/content-history.entity'
import { Scope } from '~/types/attachment-cms-server/db/entity/scope.entity'
import { Release } from '~/types/attachment-cms-server/db/entity/release.entity'
import { LABELS } from '~/services/labels'

@Component({
  components: { FormValidation },
})
export default class ContentComponent extends Vue {
  // State
  @Prop() scope: Scope
  @Prop() release: Release
  @Prop() content: ContentHistory
  @Prop() latestRelease: Release

  // Lifecycle hooks
  created() {}
  beforeMount() {}
  beforeDestroy() {}

  // Getters
  get actionLabels(): Record<string, string> {
    return LABELS.contentHistory.action
  }

  get isDisplayType() {
    return (type: string) => ['ReleaseContentHistory', 'ContentHistory'].includes(type)
  }

  // methods
  @Emit()
  showWebsite(path: string) {}

  @Emit()
  openContentHistoryModal(content: ContentHistory) {}
}
</script>