import { ApplicationEntity } from './application.entity';
export declare class ScopeInvitation extends ApplicationEntity<ScopeInvitation> {
    email: string;
    scopeId: number;
    invitationToken: string;
    joinedAt: Date;
    generateToken(): void;
}
