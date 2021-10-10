export function waitUntilValueComes(vm: any, accessor: any) {
  return new Promise((resolve, reject) => {
    const v = accessor()
    if (v) return resolve(v)
    const unwatch = vm.$watch(accessor, function (newValue: any, oldValue: any) {
      if (newValue) {
        if (unwatch) unwatch()
        return resolve(newValue)
      }
    })
  })
}
