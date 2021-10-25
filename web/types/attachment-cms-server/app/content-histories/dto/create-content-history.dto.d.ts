import { BaseDto } from '../../base/base.dto';
export declare class CreateContentHistoryDto extends BaseDto {
    releaseId: number;
    scopeId: number;
    path: string;
    selector: string;
    content: string;
    action: string;
}
export declare class CreateContentHistoryForm {
    contentHistory: CreateContentHistoryDto;
}
