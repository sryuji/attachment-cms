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
Validatorjs.register(
  'origin',
  function (value, requirement, attribute): boolean {
    return isString(value) && !!value.match(/([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$|localhost:\d{4,5}$/)
  },
  'ドメインを正しく入力してください。パスや末尾のスラッシュ(/)は不要です。'
)

export { Validatorjs }
