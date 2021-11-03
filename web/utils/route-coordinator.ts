import { NuxtAppOptions } from '@nuxt/types'
import { Route } from 'vue-router/types'

export class RouteCoordinator {
  vm: NuxtAppOptions

  constructor(vm: NuxtAppOptions) {
    this.vm = vm
  }

  backPage(prevPage: string | Partial<Route>) {
    if (window.history.length > 1) {
      this.vm.$router.back()
    } else if (typeof prevPage === 'string') {
      this.vm.$router.replace({ name: prevPage }).catch((err: Error) => err)
    } else if (prevPage instanceof Object) {
      this.vm.$router.replace(prevPage).catch((err: Error) => err)
    }
  }

  saveQuery(parameters: Record<string, string | number | boolean | Array<string | number>>) {
    this.vm.$router.replace({ query: parameters }).catch((err: Error) => err)
  }

  restoreQuery(parameters: Record<string, string | number | boolean | Array<string | number>>) {
    const query = this.vm.$route.query
    Object.keys(query).forEach((key) => {
      let v = query[key]
      // NOTE: 複数選択値のmappingに対応. ただし、parametersの初期値にArrayの定義は必須
      if (Array.isArray(parameters[key]) && v && !Array.isArray(v)) v = [v]
      if (key.endsWith('_id')) {
        if (Array.isArray(v)) {
          v = v.map((id) => parseInt(id))
        } else if (v) {
          v = parseInt(v)
        }
      }
      this.vm.$set(parameters, key, v)
    })
  }
}
