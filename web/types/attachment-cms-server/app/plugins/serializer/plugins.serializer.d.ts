import { Plugin } from '../../../db/entity/plugin.entity';
import { CollectionSerializer } from '../../base/collection.serializer';
export declare class PluginsSerializer extends CollectionSerializer {
    plugins: Plugin[];
}
