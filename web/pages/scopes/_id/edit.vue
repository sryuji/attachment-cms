<template>
  <div class="container mx-auto py-2 px-4">
    <h1 class="">{{ title }}</h1>
    <div>
      <div class="form-control max-w-md">
        <label class="label">
          <div>
            <span class="label-text">name</span>
            <span class="badge badge-error">必須</span>
          </div>
        </label>
        <input v-model="form.name" type="text" placeholder="" class="input input-bordered" />
        <form-validation :value="form.name" rules="required" />
      </div>
      <div class="form-control max-w-md">
        <label class="label">
          <span class="label-text">domain</span>
        </label>
        <input v-model="form.domain" type="text" placeholder="https://xxxxx.xxx.com" class="input input-bordered" />
        <form-validation :value="form.domain" :rules="['http_protocol', 'origin']" />
      </div>
      <div class="form-control">
        <label class="label">
          <span class="label-text">description</span>
        </label>
        <input v-model="form.description" type="text" placeholder="" class="input input-bordered" />
      </div>
    </div>
    <div class="my-3">
      <button class="btn btn-primary" @click="update">更新</button>
      <button class="btn mx-8" @click="goBack">戻る</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import { scopesStore } from '~/store'
import { ScopeDto } from '~/types/attachment-cms-server/app/scopes/dto/scope.dto'
import FormValidation from '~/components/form-validation.vue'
import { Form } from '~/utils/form'
import { convertToDtoWithForm } from '~/utils/object'
import { Scope } from '~/types/attachment-cms-server/db/entity/scope.entity'
import { eventBus } from '~/utils/event-bus'
import { RouteCoordinator } from '~/utils/route-coordinator'

@Component({
  components: { FormValidation },
})
export default class EditScopePage extends Form {
  form: ScopeDto = {
    id: null,
    name: '',
    domain: '',
    description: '',
  }

  title: string = ''
  routeCoordinator: RouteCoordinator

  head() {
    return {
      title: this.title,
    }
  }

  created() {
    super.initializeForm()
  }

  beforeDestroy() {
    super.finalizeForm()
  }

  async beforeMount() {
    this.routeCoordinator = this.routeCoordinator || new RouteCoordinator(this)

    if (!this.scope) await scopesStore.fetchScopes({})
    this.title = `${this.scope.name}`
    this.resetForm()
  }

  get scope(): Scope {
    return scopesStore.getScope(this.id)
  }

  get id(): number {
    return parseInt(this.$route.params.id)
  }

  goBack() {
    this.routeCoordinator.backPage({ path: `/scopes` })
  }

  resetForm() {
    this.form = convertToDtoWithForm<ScopeDto>(this.scope, this.form)
    this.form.id = this.id
  }

  async update() {
    if (!this.validateAll()) return

    await scopesStore.updateScope({ scope: this.form })
    this.resetForm()
    eventBus.notifyMessages('保存しました。')
  }
}
</script>
