import Vue from 'vue'
import { DirectiveFunction, DirectiveOptions } from 'vue/types/options'

const directives: Record<string, DirectiveOptions | DirectiveFunction> = {}

Object.keys(directives).forEach((key) => {
  Vue.directive(key, directives[key])
})
