import Vue from 'vue'

const vueInstance = new Vue()
export type RejectFnType = (reason: Error) => void

export function waitUntilValueComes(accessor: any, vm: Vue = vueInstance): [Promise<unknown>, RejectFnType] {
  let rejectFn: RejectFnType = null
  const wacher = new Promise((resolve, reject) => {
    const v = accessor()
    if (v) return resolve(v)
    rejectFn = reject
    const unwatch = vm.$watch(accessor, function (newValue: any, oldValue: any) {
      if (newValue) {
        if (unwatch) unwatch()
        return resolve(newValue)
      }
    })
  })
  return [wacher, rejectFn]
}
