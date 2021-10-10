import { BaseDto } from '../../base/base.dto';
export declare class ScopeDto extends BaseDto {
    readonly name: string;
    readonly domain: string;
    readonly testDomain: string;
    readonly description: string;
}
export declare class ScopeForm {
    scope: ScopeDto;
}
