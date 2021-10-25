import { BaseDto } from '../../base/base.dto';
export declare class ScopeDto extends BaseDto {
    name: string;
    domain: string;
    description: string;
}
export declare class ScopeForm {
    scope: ScopeDto;
}
