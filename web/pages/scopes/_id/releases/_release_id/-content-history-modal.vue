<template>
  <div class="modal modal-open m-3">
    <div class="modal-box max-w-4xl">
      <div class="mb-2">
        <h1 class="text-2xl">コンテンツの<span v-if="isNew">登録</span><span v-else>更新</span></h1>
      </div>
      <div class="form-control">
        <label class="label">
          <span class="label-text">ドメイン以降の/から始まるPath</span>
          <span v-if="isReleased" class="badge badge-warning">リリース済のため更新不可</span>
          <span v-else class="badge badge-error">必須</span>
        </label>
        <input
          v-model="contentHistoryDto.path"
          type="text"
          placeholder="/your/page/path"
          class="input input-bordered"
          :disabled="isReleased"
        />
        <form-validation :value="contentHistoryDto.path" :rules="['required', 'path']" />
      </div>
      <div class="form-control">
        <label class="label">
          <span class="label-text">説明</span>
        </label>
        <input
          v-model="contentHistoryDto.description"
          type="text"
          placeholder="何のためのCMS設定か説明を記載してください。任意です。"
          class="input input-bordered"
        />
      </div>
      <div class="form-control">
        <label class="label">
          <span class="label-text">HTMLElementをSelectorで指定</span>
          <span v-if="isReleased" class="badge badge-warning">リリース済のため更新不可</span>
          <span v-else class="badge badge-error">必須</span>
        </label>
        <input
          v-model="contentHistoryDto.selector"
          type="text"
          placeholder="#__layout > div > div.mx-auto.p-2 > div.card.shadow-md.my-3 > div > div.mb-6.mt-12 > div:nth-child(2) > p"
          class="input input-bordered"
          :disabled="isReleased"
        />
        <form-validation :value="contentHistoryDto.selector" rules="required" />
      </div>
      <div class="form-control">
        <label class="label justify-start">
          <span class="label-text">HTMLElementに対するAction</span>
          <span v-if="isReleased" class="badge badge-warning">リリース済のため更新不可</span>
          <span v-else class="ml-3 badge badge-error">必須</span>
        </label>
        <select
          v-model="contentHistoryDto.action"
          class="select select-bordered w-full max-w-md"
          :disabled="isReleased"
        >
          <option v-for="(label, key) in actionLabels" :key="key" :value="key">{{ label }}</option>
        </select>
        <form-validation :value="contentHistoryDto.action" rules="required" />
      </div>
      <div class="form-control">
        <label class="label">
          <span class="label-text">挿入するHTMLデータ</span>
          <span v-if="isRequiredContent" class="badge badge-error">必須</span>
        </label>
        <textarea v-model="contentHistoryDto.content" class="textarea h-48 textarea-bordered"></textarea>
        <form-validation v-if="isRequiredContent" :value="contentHistoryDto.content" rules="required" />
      </div>
      <div class="modal-action justify-between">
        <div class="flex-col">
          <label class="btn btn-primary mr-2" @click="createOrUpdate">保存</label>
          <label class="btn" @click="close">閉じる</label>
        </div>
        <label v-if="!isNew" class="btn btn-error flex-col" @click="remove">削除</label>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop } from 'nuxt-property-decorator'
import { contentHistoriesStore } from '~/store'
import { Form } from '~/utils/form'
import FormValidation from '~/components/form-validation.vue'
import { CreateContentHistoryDto } from '~/types/attachment-cms-server/app/content-histories/dto/create-content-history.dto'
import { UpdateContentHistoryDto } from '~/types/attachment-cms-server/app/content-histories/dto/update-content-history.dto'
import { ContentHistory } from '~/types/attachment-cms-server/db/entity/content-history.entity'
import { convertToDtoWithForm } from '~/utils/object'
import { LABELS } from '~/services/labels'
import { eventBus } from '~/utils/event-bus'
import { ConfirmationCloseError } from '~/utils/errors'

@Component({
  components: { FormValidation },
})
export default class ContentHistoryModal extends Form {
  // State
  contentHistoryDto: CreateContentHistoryDto & UpdateContentHistoryDto = {
    id: null,
    scopeId: null,
    releaseId: null,
    path: null,
    description: null,
    selector: null,
    action: null,
    inactive: false,
    content: null,
  }

  @Prop() scopeId: number
  @Prop() releaseId: number
  @Prop() contentHistory?: ContentHistory
  @Prop() isReleased: boolean

  // Lifecycle hooks
  created() {
    super.initializeForm()
  }

  beforeMount() {
    if (!this.isNew) this.contentHistoryDto = convertToDtoWithForm(this.contentHistory, this.contentHistoryDto)
  }

  beforeDestroy() {
    super.finalizeForm()
  }

  // Getters
  get isNew(): boolean {
    return !this.contentHistory
  }

  get isRequiredContent(): boolean {
    return ['insertBefore', 'insertChildAfterBegin', 'insertChildBeforeEnd', 'insertAfter'].includes(
      this.contentHistoryDto.action
    )
  }

  get actionLabels(): Record<string, string> {
    return LABELS.contentHistory.action
  }

  // methods
  async createOrUpdate() {
    if (!this.validateAll()) return

    if (this.isNew) {
      await this.create()
    } else {
      await this.update()
    }
    eventBus.notifyMessages('コンテンツを保存しました。')
    this.close()
  }

  private async create() {
    this.contentHistoryDto.scopeId = this.scopeId
    this.contentHistoryDto.releaseId = this.releaseId
    await contentHistoriesStore.createContentHistory({ contentHistory: this.contentHistoryDto })
  }

  private async update() {
    await contentHistoriesStore.updateContentHistory({ contentHistory: this.contentHistoryDto })
  }

  async remove() {
    try {
      await eventBus.confirm({ title: 'このコンテンツを削除しても良いですか？', style: 'error' })
      await contentHistoriesStore.deleteContentHistory({ contentHistory: this.contentHistoryDto })
      eventBus.notifyMessages('コンテンツを削除しました。')
      this.close()
    } catch (err) {
      if (err instanceof ConfirmationCloseError) return
      throw err
    }
  }

  @Emit()
  close() {}
}
</script>