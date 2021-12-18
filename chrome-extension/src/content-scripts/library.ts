import { AttachLibMessage } from '../types/message'

export function attachLib(message: AttachLibMessage) {
  if (typeof window === 'undefined' || !message.limitedReleaseToken) return
  const preLimitedReleaseToken = sessionStorage.getItem('acmst')
  if (preLimitedReleaseToken === message.limitedReleaseToken) return

  sessionStorage.setItem('acmst', message.limitedReleaseToken)

  if (!window.AttachmentCMS) {
    insertLib
  } else {
    window.AttachmentCMS.run()
  }
}

function insertLib(message: AttachLibMessage) {
  const tag2 = document.createElement('script')
  tag2.setAttribute('type', 'text/javascript')
  tag2.setAttribute('src', 'https://attachment-cms.dev/lib/attachment-cms-lib.umd.js')
  ;(document.head || document.documentElement).appendChild(tag2)
  tag2.remove()
}
