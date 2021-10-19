<template>
  <div class="container mx-auto p-2">
    <h1>Account</h1>
    <div class="form-control max-w-xl">
      <label class="label">
        <span class="label-text">Email</span>
      </label>
      <input :value="account.email" class="input input-bordered" disabled="disabled" type="text" />
      <label class="label">
        <p class="label-text-alt">
          現在、Emailの変更はできません。別のGMailアカウントに紐付け切り替えする機能を検討予定
        </p>
      </label>
    </div>
    <div class="flex flex-wrap sm:space-x-4">
      <div class="form-control flex-auto max-w-sm">
        <label class="label">
          <span class="label-text">姓</span>
        </label>
        <input v-model="form.lastName" class="input input-bordered" type="text" />
        <!-- <label class="label">
          <a href="#" class="label-text-alt">Are you sure?</a>
        </label> -->
      </div>
      <div class="form-control flex-auto max-w-sm">
        <label class="label">
          <span class="label-text">名</span>
        </label>
        <input v-model="form.firstName" class="input input-bordered" type="text" />
      </div>
    </div>
    <button class="btn btn-primary my-3" @click="update">保存</button>
  </div>
</template>

<script lang="ts">
import { Component, namespace, Vue } from 'nuxt-property-decorator'
import { accountsStore } from '~/store'
import { AccountDto } from '~/types/attachment-cms-server/app/accounts/dto/account.dto'
import { Account } from '~/types/attachment-cms-server/db/entity/account.entity'
import { eventBus } from '~/utils/event-bus'
import { convertDto } from '~/utils/object'
import FormValidation from '~/components/form-validation.vue'
import { FormValidationCordinator } from '~/utils/form-validation-cordinator'

const accountsModule = namespace('accounts')

@Component({
  head() {
    return {
      title: 'Account',
    }
  },
  components: { FormValidation },
})
export default class AccountPage extends Vue {
  form: AccountDto = { lastName: '', firstName: '' }
  @accountsModule.State('account') account: Account

  validator: FormValidationCordinator

  created() {
    this.validator = new FormValidationCordinator()
    this.validator.initializeValidationEvent()
  }

  beforeDestroy() {
    this.validator.finalizeValidationEvent()
  }

  async beforeMount() {
    await accountsStore.getAccount()
    this.resetForm()
  }

  resetForm() {
    this.form = convertDto<AccountDto>(this.account, ['lastName', 'firstName'])
  }

  async update() {
    const valid = this.validator.validateAll()
    if (!valid) return eventBus.notifyMessages('入力不備があります', 'warning')

    await accountsStore.updateAccount({
      account: this.form,
    })
    this.resetForm()
    eventBus.notifyMessages('保存しました。')
  }
}
</script>
