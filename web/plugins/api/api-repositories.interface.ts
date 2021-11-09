import { AccountsRepository } from '../../repositories/accounts.repository'
import { AuthRepository } from '~/repositories/auth.repository'
import { ScopesRepository } from '~/repositories/scopes.repository'
import { ContentHistoriesRepository } from '~/repositories/content-histories.repository'
import { ReleasesRepository } from '~/repositories/releases.repository'
import { AccountScopesRepository } from '~/repositories/account-scopes.repository'
import { ScopeInvitationsRepository } from '~/repositories/scope-invitation.repository'

/**
 * namespaceが別れてる場合、'accounts/test'と記載
 */
export interface ApiRepositories {
  accounts: AccountsRepository
  auth: AuthRepository
  scopes: ScopesRepository
  releases: ReleasesRepository
  contentHistories: ContentHistoriesRepository
  accountScopes: AccountScopesRepository
  scopeInvitations: ScopeInvitationsRepository
}
