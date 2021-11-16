import 'vue'
import '@nuxt/types'

// NOTE: for components/loading.vue
declare module '@nuxt/types/app' {
  interface DefaultNuxtLoading extends Vue {
    loading: boolean
  }
  interface CustomNuxtLoading extends Vue {
    loading: boolean
  }
}
