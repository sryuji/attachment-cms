import { AccountScope } from '../../../db/entity/account-scope.entity';
import { Account } from '../../../db/entity/account.entity';
export declare class AuthUserDto {
    sub: number;
    email: string;
    super: boolean;
    accountScopes: AccountScope[];
    constructor(account?: Account);
    toJSON(): {
        sub: number;
        email: string;
        super: boolean;
        accountScopes: AccountScope[];
    };
}
