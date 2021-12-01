import pick from 'lodash/pick'

export function convertToDtoWithForm<D>(source: any, form: D): D {
  const keys = Object.keys(form) as (keyof D)[]
  return convertToDto<D>(source, keys)
}

export function convertToDto<D>(source: any, keys: (keyof D)[]): D {
  return pick(source, keys) as D
}

export function isUndefined(target: unknown): target is undefined {
  return target === undefined
}

export function isNotUndefined(target: unknown) {
  return !isUndefined(target)
}

export function isNull(target: unknown): target is null {
  return target === null
}

export function isNotNull(target: unknown) {
  return !isNull(target)
}

export function isNullOrUndefined(target: unknown): target is null | undefined {
  return target === null || target === undefined
}
