import pick from 'lodash/pick'

export function convertToDtoWithForm<D>(source: any, form: D): D {
  const keys = Object.keys(form) as (keyof D)[]
  return convertToDto<D>(source, keys)
}

export function convertToDto<D>(source: any, keys: (keyof D)[]): D {
  return pick(source, keys) as D
}
