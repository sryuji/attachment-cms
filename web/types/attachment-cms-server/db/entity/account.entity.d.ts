import { AccountScope } from './account-scope.entity';
import { ApplicationEntity } from './application.entity';
export declare class Account extends ApplicationEntity<Account> {
    email: string;
    lastName: string;
    firstName: string;
    avatarUrl: string;
    super: boolean;
    jwtRefreshToken: string;
    jwtRefreshTokenIssuedAt: Date;
    googleAccessToken: string;
    googleRefreshToken: string;
    authenticatedAt: Date;
    accountScopes: AccountScope[];
}
