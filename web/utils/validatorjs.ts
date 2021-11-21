// https://github.com/mikeerickson/validatorjs
import Validatorjs from 'validatorjs'
import { isString } from './string'

Validatorjs.useLang('ja')
Validatorjs.register(
  'http_protocol',
  function (value, requirement, attribute): boolean {
    return isString(value) && !!value.match(/^http(s)?:/)
  },
  'https: 、もしくは、http:から開始する必要があります。'
)

export { Validatorjs }
