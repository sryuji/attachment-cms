import 'vue'
import '@nuxt/types'
import 'vuex/types'

declare module 'vue/types/vue' {
  interface Vue {
    $gtm: any
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $gtm: any
  }
}

declare module 'vuex/types/index' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Store<S> {
    $gtm: any
  }
}
