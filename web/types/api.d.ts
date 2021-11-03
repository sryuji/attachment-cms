import 'vue'
import '@nuxt/types'
import 'vuex/types'
import { ApiRepositories } from '~/plugins/api/api-repositories.interface'

declare module 'vue/types/vue' {
  interface Vue {
    $api: ApiRepositories
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $api: ApiRepositories
  }
}

declare module 'vuex/types/index' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Store<S> {
    $api: ApiRepositories
  }
}
