import { ApplicationEntity } from './application.entity';
import { Scope } from './scope.entity';
import { ContentHistory } from './content-history.entity';
export declare class Release extends ApplicationEntity<Release> {
    scopeId: number;
    scope: Scope;
    limitedReleaseToken: string;
    limitedReleaseTokenIssuedAt: Date;
    releasedAt: Date;
    rollbackedAt: Date;
    sourceReleaseId: number;
    contentHistories: ContentHistory[];
}
