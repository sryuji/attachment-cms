import { BaseDto } from '../../base/base.dto';
export declare class CreateContentHistoryDto extends BaseDto {
    readonly releaseId: number;
    readonly scopeId: number;
    readonly path: string;
    readonly selector: string;
    readonly content: string;
    readonly action: string;
}
export declare class CreateContentHistoryForm {
    contentHistory: CreateContentHistoryDto;
}
