import { Pager } from '../../base/pager';
import { Release } from '../../../db/entity/release.entity';
import { BaseSerializer } from '../../base/base.serializer';
export declare class ReleasesSerializer extends BaseSerializer {
    readonly releases: Release[];
    readonly pager?: Pager;
}
