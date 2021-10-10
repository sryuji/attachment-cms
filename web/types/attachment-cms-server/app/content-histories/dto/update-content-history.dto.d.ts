import { BaseDto } from '../../base/base.dto';
export declare class UpdateContentHistoryDto extends BaseDto {
    readonly scopeId: number;
    readonly path: string;
    readonly selector: string;
    readonly content: string;
    readonly action: string;
    readonly inactive: boolean;
}
export declare class UpdateContentHistoryForm {
    contentHistory: UpdateContentHistoryDto;
}
