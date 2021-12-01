import { NuxtAppOptions } from '@nuxt/types'
import { Route } from 'vue-router/types'
import { isNullOrUndefined } from './object'

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

  replaceQuery(parameters: Record<string, string | number | boolean | Array<string | number>>) {
    const query = Object.keys(parameters).reduce((prev: typeof parameters, currentKey: string) => {
      if (!isNullOrUndefined(parameters[currentKey])) prev[currentKey] = parameters[currentKey]
      return prev
    }, {})
    this.vm.$router.replace({ query }).catch((err: Error) => err)
  }

  setQueryToState(parameters: Record<string, string | number | boolean | Array<string | number>>) {
    const query = this.vm.$route.query
    const parameterKeys = Object.keys(parameters)
    Object.keys(query).forEach((key) => {
      if (!parameterKeys.includes(key)) return

      let v = query[key]
      if (!isNullOrUndefined(v)) {
        if (typeof parameters[key] === 'number' || v.match(/\d+/)) v = parseInt(v)
        if (['true'].includes(v)) {
          v = true
        } else if (['false'].includes(v)) {
          v = false
        }
        if (Array.isArray(parameters[key]) && !Array.isArray(v)) v = [v]
      }
      this.vm.$set(parameters, key, v)
    })
  }
}
