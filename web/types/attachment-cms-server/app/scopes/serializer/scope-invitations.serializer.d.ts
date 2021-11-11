import { ScopeInvitation } from '../../../db/entity/scope-invitation.entity';
import { CollectionSerializer } from '../../base/collection.serializer';
import { Pager } from '../../base/pager';
import { ScopeInvitationResponse } from './scope-invtation.response';
export declare class ScopeInvitationsSerializer extends CollectionSerializer {
    scopeInvitations: ScopeInvitationResponse[];
    serialize(attributes: {
        scopeInvitations: ScopeInvitation[];
        pager: Pager;
    }): this;
}
