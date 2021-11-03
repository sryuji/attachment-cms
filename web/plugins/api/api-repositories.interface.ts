import { AccountsRepository } from '../../repositories/accounts.repository'
import { AuthRepository } from '~/repositories/auth.repository'
import { ScopesRepository } from '~/repositories/scopes.repository'
import { ContentHistoriesRepository } from '~/repositories/content-histories.repository'
import { ReleasesRepository } from '~/repositories/releases.repository'

/**
 * namespaceが別れてる場合、'accounts/test'と記載
 */
export interface ApiRepositories {
  accounts: AccountsRepository
  auth: AuthRepository
  scopes: ScopesRepository
  releases: ReleasesRepository
  contentHistories: ContentHistoriesRepository
}
