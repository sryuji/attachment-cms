import get from 'lodash.get'
import set from 'lodash.set'
import unset from 'lodash.unset'

function notifyUnavailableLocalStorage(exception?: unknown) {
  // Sentry.withScope((scope) => {
  //   scope.setLevel(Sentry.Severity.Warning)
  //   if (typeof exception === 'string') {
  //     Sentry.captureMessage(exception || 'No LocalStorage')
  //   } else {
  //     Sentry.captureException(exception)
  //   }
  // })
}

type Value = object | string
type Model = Record<string, Value>

export function fetchModel(key: string, initialValue = {}): Model | void {
  if (!localStorage) return notifyUnavailableLocalStorage()
  try {
    const raw = localStorage.getItem(key)
    const model = raw ? JSON.parse(raw) : initialValue
    return model
  } catch (e) {
    notifyUnavailableLocalStorage(e)
  }
}

export function saveModel(key: string, model: Model): boolean | void {
  if (!localStorage) return notifyUnavailableLocalStorage()
  model = model || {}
  try {
    localStorage.setItem(key, JSON.stringify(model))
    return true
  } catch (e) {
    return notifyUnavailableLocalStorage(e)
  }
}

export function deleteModel(key: string): boolean | void {
  if (!localStorage) return notifyUnavailableLocalStorage()
  try {
    localStorage.removeItem(key)
    return true
  } catch (e) {
    notifyUnavailableLocalStorage(e)
  }
}

export function fetchProperty(key: string, path: string | string[]): Model | void {
  const model = fetchModel(key)
  if (!model) return
  return get(model, path)
}

export function saveProperty(key: string, path: string | string[], data: any): boolean | void {
  const model = fetchModel(key)
  if (!model) return false
  set(model, path, data)
  return saveModel(key, model)
}

export function deleteProperty(key: string, path: string | string[]): boolean | void {
  const model = fetchModel(key)
  if (!model) return false
  unset(model, path)
  return saveModel(key, model)
}
