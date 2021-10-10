import { AccountScope } from '../../../db/entity/account-scope.entity';
import { Account } from '../../../db/entity/account.entity';
export declare class AuthUserDto {
    readonly sub: number;
    readonly email: string;
    readonly accountScopes: AccountScope[];
    constructor(account?: Account);
    toJSON(): {
        sub: number;
        email: string;
        accountScopes: AccountScope[];
    };
}
