import { Scope } from '../../../db/entity/scope.entity';
import { CollectionSerializer } from '../../base/collection.serializer';
export declare class ScopesSerializer extends CollectionSerializer {
    readonly scopes: Scope[];
}
