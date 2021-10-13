import { AccountsRepository } from '../../repositories/accounts.repository'
import { AuthRepository } from '~/repositories/auth.repository'
import { ScopesRepository } from '~/repositories/scopes.repository'

/**
 * namespaceが別れてる場合、'accounts/test'と記載
 */
export interface ApiRepositories {
  accounts: AccountsRepository
  auth: AuthRepository
  scopes: ScopesRepository
}
