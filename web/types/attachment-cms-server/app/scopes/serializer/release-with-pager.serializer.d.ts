import { Release } from '../../../db/entity/release.entity';
import { BaseSerializer } from '../../base/base.serializer';
import { Pager } from '../../base/pager';
export declare class ReleaseWithPagerSerializer extends BaseSerializer {
    release: Release;
    pager?: Pager;
}
