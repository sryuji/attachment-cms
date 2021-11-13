<template>
  <div class="flex">
    <div class="text-left flex-col">
      <div>
        <span class="text-2xl">{{ scope.name }}</span>
      </div>
      <div>
        <span class="text-sm">{{ scope.domain }}</span>
      </div>
      <p class="text-sm text-grey-dark">{{ scope.description }}</p>
    </div>
    <template v-if="isOwner(scope.id)">
      <div class="flex-shrink-0">
        <nuxt-link :to="{ path: `/scopes/${scope.id}/edit` }" class="ml-3 btn btn-sm">編集</nuxt-link>
      </div>
      <div class="flex-shrink-0">
        <nuxt-link :to="{ path: `/scopes/${scope.id}/member` }" class="ml-3 btn btn-sm">メンバー</nuxt-link>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, namespace, Prop, Vue } from 'nuxt-property-decorator'
import { Scope } from '~/types/attachment-cms-server/db/entity/scope.entity'

const accountsModule = namespace('accounts')

@Component({})
export default class ScopeHeader extends Vue {
  @Prop() scope: Scope
  @accountsModule.Getter('isOwner') isOwner: Function
}
</script>