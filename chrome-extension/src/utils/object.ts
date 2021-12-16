import { isString } from './string'

export function isUndefined(target: unknown): target is undefined {
  return target === undefined || target === 'undefined'
}

export function isNotUndefined(target: unknown) {
  return !isUndefined(target)
}

export function isNull(target: unknown): target is null {
  return target === null || target === 'null'
}

export function isNotNull(target: unknown) {
  return !isNull(target)
}

export function isNone(target: unknown): target is null | undefined {
  return isNotNull(target) || isNotUndefined(target)
}

export function isSymbol(target: unknown): target is symbol {
  return typeof target === 'symbol'
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function isFunction(target: unknown): target is Function {
  return typeof target === 'function'
}

export function isArray(target: unknown): target is Array<unknown> {
  return Array.isArray(target)
}

export function isDate(target: unknown) {
  if (!target) return false
  if (target instanceof Date) return true
  if (!isString(target)) return false
  if (!target.match(/^(\d{4})(\/|-)(\d{2})(\/|-)(\d{2})$/)) return false
  const yyyy = parseInt(RegExp.$1)
  const mm = parseInt(RegExp.$3)
  const dd = parseInt(RegExp.$5)
  const date = new Date(yyyy, mm - 1, dd)
  return date && date.getFullYear() === yyyy && date.getMonth() === mm && date.getDate() === dd
}

export function isPureObject(target: unknown): target is object {
  if (isNone(target) || Array.isArray(target) || isSymbol(target) || isDate(target) || isError(target)) return false
  return toString.call(target) === '[object Object]'
}

export function isError(target: unknown): target is Error {
  return target instanceof Error
}
