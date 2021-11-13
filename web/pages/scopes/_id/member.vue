<template>
  <div class="container mx-auto p-2">
    <h1>{{ title }}</h1>

    <div v-if="scopeInvitations.length > 0" class="overflow-x-auto mt-10">
      <h2>招待中</h2>
      <table class="table w-full table-zebra mt-3">
        <thead>
          <tr>
            <th><span class="normal-case">email</span></th>
            <th>申込日時</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="scopeInvitation in scopeInvitations" :key="scopeInvitation.id">
            <td>{{ scopeInvitation.email }}</td>
            <td>{{ scopeInvitation.createdAt | formatDate('yyyy/MM/dd HH:mm') }}</td>
            <td>
              <a
                class="btn btn-sm btn-warning"
                :href="`/auth/invitation?token=${scopeInvitation.invitationToken}`"
                target="_blank"
                >招待URL</a
              >
            </td>
            <td>
              <button class="btn btn-sm btn-error" @click="deleteInvitation(scopeInvitation.id)">取消</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="mt-10">
      <div class="flex items-end">
        <div class="form-control w-96">
          <label class="label">
            <div>
              <span class="label-text">招待先Email</span>
            </div>
          </label>
          <input v-model="invitationEmail" type="text" placeholder="" class="input input-bordered" />
        </div>
        <div class="ml-6">
          <button class="btn btn-md btn-primary" @click="invite(invitationEmail)">招待</button>
        </div>
      </div>
      <form-validation :value="invitationEmail" rules="required|email" />
    </div>
    <div v-if="accountScopes.length > 0" class="overflow-x-auto mt-10">
      <h2>メンバー</h2>
      <table class="table w-full table-zebra mt-3">
        <thead>
          <tr>
            <th><span class="normal-case">email</span></th>
            <th>氏名</th>
            <th><span class="normal-case">権限</span></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="accountScope in accountScopes" :key="accountScope.id">
            <td>{{ accountScope.account.email }}</td>
            <td>{{ accountScope.account.lastName }} {{ accountScope.account.firstName }}</td>
            <td>
              <select
                class="select select-bordered max-w-xs"
                :value="accountScope.role"
                @change="updateAccountScope(accountScope, $event)"
              >
                <option v-for="role in Object.values(roles)" :key="role" :value="role">{{ role }}</option>
              </select>
            </td>
            <td>
              <button class="btn btn-sm btn-error" @click="deleteAccountScope(accountScope.id)">
                プロジェクトから削除
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <p class="my-3 text-warning">
      ※ 権限の変更が反映されるのは30分程の時間を要します。急ぎの場合は、一度、Sign outしてください。
    </p>
    <div class="my-9">
      <button class="btn" @click="goBack">戻る</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import { scopesStore, accountsStore } from '~/store'
import FormValidation from '~/components/form-validation.vue'
import { Form } from '~/utils/form'
import { Scope } from '~/types/attachment-cms-server/db/entity/scope.entity'
import { eventBus } from '~/utils/event-bus'
import { RouteCoordinator } from '~/utils/route-coordinator'
import { AccountScopesSerializer } from '~/types/attachment-cms-server/app/account-scopes/serializer/account-scopes.serializer'
import { ScopeInvitationsSerializer } from '~/types/attachment-cms-server/app/scopes/serializer/scope-invitations.serializer'
import { ScopeInvitationResponse } from '~/types/attachment-cms-server/app/scopes/serializer/scope-invtation.response'
import { AccountScope } from '~/types/attachment-cms-server/db/entity/account-scope.entity'
import { ConfirmationCloseError } from '~/components/confirmation.vue'
import { ScopeInvitation } from '~/types/attachment-cms-server/db/entity/scope-invitation.entity'

@Component({
  components: { FormValidation },
})
export default class memberPage extends Form {
  accountScopes: AccountScope[] = []
  scopeInvitations: (ScopeInvitationResponse | ScopeInvitation)[] = []
  title: string = ''
  invitationEmail: string = ''
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

    const promise1: Promise<void | Scope[]> = this.scope ? Promise.resolve() : scopesStore.fetchScopes({})
    const promise2: Promise<AccountScopesSerializer> = this.$api.accountScopes.findAll({ scopeId: this.id })
    const promise3: Promise<ScopeInvitationsSerializer> = this.$api.scopeInvitations.findAll({ scopeId: this.id })
    const promise4: Promise<void> = accountsStore.fetchAccount()
    const [, res2, res3] = await Promise.all([promise1, promise2, promise3, promise4])
    this.accountScopes = res2.accountScopes
    this.scopeInvitations = res3.scopeInvitations
    this.title = `member - ${this.scope.name}`
  }

  get scope(): Scope {
    return scopesStore.getScope(this.id)
  }

  get id(): number {
    return parseInt(this.$route.params.id)
  }

  get me() {
    return accountsStore.account
  }

  get roles() {
    return { member: 'member', owner: 'owner' }
  }

  goBack() {
    this.routeCoordinator.backPage({ path: `/scopes` })
  }

  async deleteInvitation(id: number) {
    try {
      await eventBus.confirm({ title: 'この招待を削除しても良いですか？' })
      await this.$api.scopeInvitations.delete(id)
      eventBus.notifyMessages('招待を取り消しました。')
      const index = this.scopeInvitations.findIndex((r) => r.id === id)
      this.scopeInvitations.splice(index, 1)
    } catch (err) {
      if (err instanceof ConfirmationCloseError) return
      throw err
    }
  }

  async deleteAccountScope(id: number) {
    try {
      await eventBus.confirm({ title: '削除しても良いですか？' })
      await this.$api.accountScopes.delete(id)
      eventBus.notifyMessages('プロジェクトを離脱させました。')
      this.$router.replace({ path: '/' })
    } catch (err) {
      if (err instanceof ConfirmationCloseError) return
      throw err
    }
  }

  async updateAccountScope(accountScope: AccountScope, event: Event) {
    const target = event.target as HTMLInputElement
    accountScope.role = target.value
    await this.$api.accountScopes.update(accountScope.id, { accountScope })
    eventBus.notifyMessages('更新しました。')
  }

  async invite(email: string) {
    if (!this.validateAll()) return

    await this.$api.scopeInvitations.create({ scopeInvitation: { email, scopeId: this.id } })
    eventBus.notifyMessages('招待しました。')
    const res = await this.$api.scopeInvitations.findAll({ scopeId: this.id })
    this.scopeInvitations = res.scopeInvitations
  }
}
</script>
