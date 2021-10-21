import { Middleware } from '@nuxt/types'
import { authStore } from '~/store'
import { restoreAccessToken, setIgnoreAuth } from '~/services/authentication.helper'

const authMiddleware: Middleware = ({ req, store, route }) => {
  setIgnoreAuth(route)
  if (authStore.isLoggedIn || authStore.isCheckedAuth) return

  // NOTE: パターン表 https://docs.google.com/spreadsheets/d/1clpmd06eoMsb2vzejR2HNdENegD_OGtSbpiNtBvRdBU/edit
  if (process.server) {
    restoreAccessToken(req)
  } else {
    restoreAccessToken()
  }
  authStore.checkedAuth()
}

export default authMiddleware
