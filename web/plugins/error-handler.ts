import Vue from 'vue'
import { eventBus } from '~/utils/event-bus'

function notify(err: Error) {
  // TODO: Sentry.captureException(error)
  if (['localhost', '192.168'].find((s) => window && window.location && window.location.hostname.startsWith(s))) {
    err && console.error(err)
  }
}

function handleError(err: Error, vm?: Vue, info?: string) {
  const name = err ? err.name : null
  switch (name) {
    case 'DoubleSubmitError':
      return
    case 'BadRequestError':
    case 'ForbiddenError':
    case 'NotFoundError':
    case 'UnauthorizedError':
    case 'NetworkError':
    case 'TimeoutError':
    case 'ServerValidationError':
    case 'RedirectError':
    case 'ClientValidationError':
      return eventBus.notifyError(err)
    default:
      notify(err)
      return eventBus.notifyError(err)
  }
}

export default () => {
  Vue.config.errorHandler = (err: Error, vm: Vue, info: string) => {
    handleError(err, vm, info)
  }

  if (process.client) {
    window.addEventListener('error', (event) => {
      handleError(event.error)
    })

    window.addEventListener('unhandledrejection', (event) => {
      handleError(event.reason)
    })
  }
}
