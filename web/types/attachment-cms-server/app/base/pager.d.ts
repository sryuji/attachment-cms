export declare class Pager {
    page: number;
    per: number;
    totalCount: number;
    constructor(attributes: Partial<Pager>);
    get totalPages(): number;
    get offset(): number;
    toFindManyOptions(): Record<'take' | 'skip', number>;
}
