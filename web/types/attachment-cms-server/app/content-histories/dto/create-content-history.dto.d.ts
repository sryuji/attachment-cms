import { ContentHistoryDto } from './content-history.dto';
export declare class CreateContentHistoryDto extends ContentHistoryDto {
    releaseId: number;
    scopeId: number;
}
export declare class CreateContentHistoryForm {
    contentHistory: CreateContentHistoryDto;
}
