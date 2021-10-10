import { Pager } from './pager';
import { BaseSerializer } from './base.serializer';
export declare abstract class CollectionSerializer extends BaseSerializer {
    readonly pager?: Pager;
}
