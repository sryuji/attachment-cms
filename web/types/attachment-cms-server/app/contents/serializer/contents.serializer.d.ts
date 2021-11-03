import { ContentHistory } from '../../../db/entity/content-history.entity';
import { BaseSerializer } from '../../base/base.serializer';
import { ContentDto } from '../dto/content.dto';
export declare class ContentsSerializer extends BaseSerializer {
    contents: Record<string, Partial<ContentDto>[]>;
    serialize(collection: ContentHistory[]): this;
}
