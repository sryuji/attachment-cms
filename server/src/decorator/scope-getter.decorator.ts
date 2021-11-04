import { SetMetadata } from '@nestjs/common'

export type ScopeGetterArgs = {
  params: Record<string, string>
  query: Record<string, string | string[]>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: Record<string, any>
}

export type ScopeGetterHandler = ({
  params,
  query,
  body,
}: ScopeGetterArgs) => number | string | undefined | Promise<number | string | undefined>

export const SCOPE_GETTER_KEY = 'scope_getter'
export function ScopeGetter(getter: ScopeGetterHandler) {
  return SetMetadata(SCOPE_GETTER_KEY, getter)
}
