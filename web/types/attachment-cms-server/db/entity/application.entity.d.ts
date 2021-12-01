import { BaseEntity } from 'typeorm';
export declare abstract class ApplicationEntity<E> extends BaseEntity {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    constructor(attributes?: unknown);
    isNew(): boolean;
    validateEntity(): Promise<void>;
}
