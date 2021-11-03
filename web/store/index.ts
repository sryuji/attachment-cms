import { Store } from 'vuex'
import { config } from 'vuex-module-decorators'
import { initialiseStores } from '~/utils/store-accessor'

config.rawError = true

const initializer = (store: Store<any>) => initialiseStores(store)
export const plugins = [initializer]
export * from '~/utils/store-accessor'
