import pick from 'lodash/pick'

export function convertDto<D>(source: any, keys: (keyof D)[]): D {
  return pick(source, keys) as D
}
