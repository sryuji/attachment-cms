/* eslint-disable import/no-mutable-exports */
import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'

import auth from '~/store/auth'
import accounts from '~/store/accounts'
import scopes from '~/store/scopes'
import releases from '~/store/releases'
import contentHistories from '~/store/content-histories'

let authStore: auth
let accountsStore: accounts
let scopesStore: scopes
let releasesStore: releases
let contentHistoriesStore: contentHistories

function initialiseStores(store: Store<any>): void {
  authStore = getModule(auth, store)
  accountsStore = getModule(accounts, store)
  scopesStore = getModule(scopes, store)
  releasesStore = getModule(releases, store)
  contentHistoriesStore = getModule(contentHistories, store)
}

export { initialiseStores, authStore, accountsStore, scopesStore, releasesStore, contentHistoriesStore }
