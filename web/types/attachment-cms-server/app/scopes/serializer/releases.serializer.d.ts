import { Release } from '../../../db/entity/release.entity';
import { CollectionSerializer } from '../../base/collection.serializer';
export declare class ReleasesSerializer extends CollectionSerializer {
    releases: Release[];
}
