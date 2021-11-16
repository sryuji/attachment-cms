import { Plugin } from '@nuxt/types'
import { initializeGtm } from '~/utils/gtm-accessor'

const gtmPlugin: Plugin = ({ app }) => {
  initializeGtm(app.$gtm)
}

export default gtmPlugin
