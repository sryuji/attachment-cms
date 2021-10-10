import { Pager } from '../../base/pager';
import { ContentHistory } from '../../../db/entity/content-history.entity';
import { CollectionSerializer } from '../../base/collection.serializer';
export declare class ContentHistoriesSerializer extends CollectionSerializer {
    readonly scopes: ContentHistory[];
    readonly pager?: Pager;
}
