import { AttachmentCMS, getLoadedStatus } from '../../public/lib/attachment-cms-lib.es'

export { getLoadedStatus }

export function attachLib(limitedReleaseToken?: string, force = false) {
  if (limitedReleaseToken) sessionStorage.setItem('acmst', limitedReleaseToken)

  const status = getLoadedStatus()
  if (force || !status) {
    new AttachmentCMS({ token: 'dummy', isExtension: true }).run()
  } else if (['extension', 'official'].includes(status)) {
    window.location.reload()
  }
}
