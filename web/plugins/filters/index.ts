import Vue from 'vue'

// import * from './address'
// import * from './string'
import * as dateFilters from './date'
import * as numberFilters from './number'

const filters: Record<string, Function> = { ...dateFilters, ...numberFilters }

Object.keys(filters).forEach((key) => {
  const fn: Function = filters[key]
  Vue.filter(key, fn)
})
