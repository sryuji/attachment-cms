import { ApplicationEntity } from './application.entity';
import { Release } from './release.entity';
import { AccountScope } from './account-scope.entity';
export declare class Scope extends ApplicationEntity<Scope> {
    name: string;
    private _domain;
    get domain(): string;
    set domain(v: string);
    testDomain: string;
    description: string;
    token: string;
    releases: Release[];
    defaultReleaseId: number;
    defaultRelease: Release;
    generateToken(): void;
    accountScopes: AccountScope[];
}
