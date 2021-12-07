import fs from 'fs-extra'
import { resolve } from './file'

export function buildPathValues(dir: string) {
  return fs.readdirSync(resolve(dir)).reduce((result: Record<string, string>, current) => {
    const name = current.replace('.ts', '')
    result[name] = resolve(`${dir}/${current}`)
    return result
  }, {})
}
