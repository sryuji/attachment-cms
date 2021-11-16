/* eslint-disable import/no-mutable-exports */

let $gtm: any

export function initializeGtm(gtm: any) {
  $gtm = gtm
}
export { $gtm }
