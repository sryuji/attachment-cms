import { ApplicationEntity } from './application.entity';
import { Release } from './release.entity';
import { Scope } from './scope.entity';
export declare class ContentHistory extends ApplicationEntity<ContentHistory> {
    scopeId: number;
    scope: Scope;
    releaseId: number;
    release: Release;
    path: string;
    selector: string;
    content: string;
    action: string;
    inactive: boolean;
    sourceContentHistoryId: number;
}
