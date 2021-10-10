import { Release } from '../../../db/entity/release.entity';
import { BaseSerializer } from '../../base/base.serializer';
import { Scope } from '../../../db/entity/scope.entity';
declare class ExposedRelease extends Release {
    getLimitedReleaseToken(): string;
    exposedScope: Scope;
}
export declare class ReleaseSerializer extends BaseSerializer {
    release: ExposedRelease;
    serialize({ release }: {
        release: Release;
    }): Promise<this>;
}
export {};
