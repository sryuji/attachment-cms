<template>
  <div class="container mx-auto p-2">
    <h1>{{ title }}</h1>
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
      </div>
      <div class="form-control">
        <label class="label">
          <span class="label-text">description</span>
        </label>
        <input v-model="form.description" type="text" placeholder="" class="input input-bordered" />
      </div>
      <button class="btn btn-primary my-3" @click="create">登録</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import { scopesStore } from '~/store'
import { ScopeDto } from '~/types/attachment-cms-server/app/scopes/dto/scope.dto'
import FormValidation from '~/components/form-validation.vue'
import { Form } from '~/utils/form'

@Component({
  components: { FormValidation },
})
export default class CreateScopePage extends Form {
  form: ScopeDto = {
    id: null,
    name: '',
    domain: '',
    description: '',
  }

  title = 'Create new Project'
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

  beforeMount() {}

  async create() {
    if (!this.validateAll()) return

    const scope = await scopesStore.createScope({ scope: this.form })
    this.$router.push({ path: `/scopes/${scope.id}/releases` })
  }
}
</script>
