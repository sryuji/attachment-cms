import { Account } from './account.entity';
import { ApplicationEntity } from './application.entity';
import { Scope } from './scope.entity';
export declare class AccountScope extends ApplicationEntity<AccountScope> {
    accountId: number;
    account: Account;
    scopeId: number;
    scope: Scope;
}
