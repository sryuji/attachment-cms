<template>
  <div class="">
    <h1>Account</h1>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { mapGetters } from 'vuex'
import { accountsStore } from '~/store'
import { AccountDto } from '~/types/attachment-cms-server/app/accounts/dto/account.dto'
import { convertDto } from '~/utils/object'

@Component({
  head() {
    return {
      title: 'Account',
    }
  },
  computed: {
    ...mapGetters('accounts', ['account']),
  },
})
export default class AccountPageComponent extends Vue {
  account: Account

  beforeMount() {
    accountsStore.getAccount()
  }

  update() {
    const dto = convertDto<AccountDto>(this.account, ['lastName', 'firstName'])
    accountsStore.updateAccount({
      account: dto,
    })
  }
}
</script>
