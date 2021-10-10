import { Scope } from '../../../db/entity/scope.entity';
import { BaseSerializer } from '../../base/base.serializer';
export declare class ExposedScope extends Scope {
    getToken(): string;
}
export declare class ScopeSerializer extends BaseSerializer {
    scope: ExposedScope;
    serialize({ scope }: {
        scope: Scope;
    }): this;
}
