/* eslint-disable import/no-mutable-exports */

import { ApiRepositories } from '~/plugins/api/api-repositories.interface'

let $api: ApiRepositories

export function initializeApi(repositories: ApiRepositories) {
  $api = repositories
}
export { $api }
