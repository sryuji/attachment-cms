import { resolve as r } from 'path'

export function resolve(...args: string[]) {
  return r(__dirname, '..', '..', ...args)
}
