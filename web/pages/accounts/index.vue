<template>
  <div v-if="account" class="container mx-auto p-2">
    <h1>Account</h1>
    <div class="form-control max-w-xl">
      <label class="label">
        <span class="label-text">Email</span>
      </label>
      <input :value="account.email" class="input input-bordered" disabled="disabled" type="text" />
      <label class="label">
        <p class="label-text-alt">
          現在、Emailの変更はできません。別のGMailアカウントに紐付け切り替えする機能を検討中です。
        </p>
      </label>
    </div>
    <div>
      <div class="flex flex-wrap sm:space-x-4">
        <div class="form-control flex-auto max-w-sm">
          <label class="label">
            <span class="label-text">姓</span>
          </label>
          <input v-model="form.lastName" class="input input-bordered" type="text" />
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

    <div class="overflow-x-auto mt-10">
      <h2>参加中のProject</h2>
      <template v-if="scopes.length > 0">
        <table class="table w-full table-zebra mt-3">
          <thead>
            <tr>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="scope in scopes" :key="scope.id">
              <td>{{ scope.name }}</td>
              <td>
                <button class="btn btn-sm btn-error" @click="deleteAccountScope(scope)">
                  プロジェクトから離脱する
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, namespace } from 'nuxt-property-decorator'
import { accountsStore, authStore } from '~/store'
import { AccountDto } from '~/types/attachment-cms-server/app/accounts/dto/account.dto'
import { Account } from '~/types/attachment-cms-server/db/entity/account.entity'
import { eventBus } from '~/utils/event-bus'
import { convertToDto } from '~/utils/object'
import FormValidation from '~/components/form-validation.vue'
import { Form } from '~/utils/form'
import { Scope } from '~/types/attachment-cms-server/db/entity/scope.entity'
import { ConfirmationCloseError } from '~/components/confirmation.vue'

const accountsModule = namespace('accounts')
const scopesModule = namespace('scopes')

@Component({
  head() {
    return {
      title: 'Account',
    }
  },
  components: { FormValidation },
})
export default class AccountPage extends Form {
  form: AccountDto = { id: null, lastName: '', firstName: '' }
  @accountsModule.State('account') account: Account
  @scopesModule.State('scopes') scopes: Scope[]

  created(): void {
    super.initializeForm()
  }

  beforeDestroy(): void {
    super.finalizeForm()
  }

  async beforeMount() {
    await authStore.fetchRequiredDataOnLoggedIn()
    this.resetForm()
  }

  resetForm() {
    this.form = convertToDto<AccountDto>(this.account, ['id', 'lastName', 'firstName'])
  }

  async update() {
    if (!this.validateAll()) return

    await accountsStore.updateAccount({ account: this.form })
    this.resetForm()
    eventBus.notifyMessages('保存しました。')
  }

  async deleteAccountScope(scope: Scope) {
    try {
      await eventBus.confirm({ title: `${scope.name} から離脱しても良いですか？` })
      await this.$api.accountScopes.deleteByScopeId(scope.id)
      eventBus.notifyMessages('プロジェクトを離脱しました。')
      return authStore.fetchRequiredDataOnLoggedIn()
    } catch (err) {
      if (err instanceof ConfirmationCloseError) return
      throw err
    }
  }
}
</script>
