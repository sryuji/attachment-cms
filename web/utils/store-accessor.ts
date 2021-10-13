/* eslint-disable import/no-mutable-exports */
import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'

import auth from '~/store/auth'
import accounts from '~/store/accounts'
import scopes from '~/store/scopes'

let authStore: auth
let accountsStore: accounts
let scopesStore: scopes

function initialiseStores(store: Store<any>): void {
  authStore = getModule(auth, store)
  accountsStore = getModule(accounts, store)
  scopesStore = getModule(scopes, store)
}

export { initialiseStores, authStore, accountsStore, scopesStore }
