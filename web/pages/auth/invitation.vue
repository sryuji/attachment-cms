<template>
  <div class="container mx-auto p-2 flex justify-center">
    <div>
      <h1 class="my-6">attachment CMSへの招待</h1>

      <template v-if="scopeInvitation">
        <div class="my-6 text-lg">
          <p>Google認証後、自動的にProjectに招待されます。</p>
          <p>Projectでは、CMS管理対象となるコンテンツとそれらのリリースを管理しています。</p>
        </div>
        <div class="my-12">
          <img
            class="cursor-pointer"
            src="~/assets/images/google/btn_google_signin_light_normal_web.png"
            @click="moveGoogleAuthPage"
          />
        </div>
      </template>
      <template v-else>
        <div class="my-6 text-lg text-red">
          <p>招待に失敗しました。</p>
          <p>URLに不備がないか確認してください。</p>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { INVITATION_KEY } from '~/services/constants'
import { ScopeInvitation } from '~/types/attachment-cms-server/db/entity/scope-invitation.entity'
import { saveModel } from '~/utils/local-storage'

@Component({
  meta: { auth: false },
  head() {
    return {
      title: 'Invitation',
    }
  },
})
export default class extends Vue {
  token: string = null
  scopeInvitation: ScopeInvitation = null

  async beforeMount() {
    this.token = this.$route.query.token as string
    if (!this.token) return
    const data = await this.$api.scopeInvitations.findOne(this.token)
    this.scopeInvitation = data.scopeInvitation
    saveModel(INVITATION_KEY, { token: this.token })
  }

  mounted() {}

  moveGoogleAuthPage(): void {
    window.location.href = `${this.$config.API_BASE_URL}/auth/google`
  }
}
</script>
