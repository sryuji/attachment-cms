import { ContentHistoryDto } from './content-history.dto';
export declare class UpdateContentHistoryDto extends ContentHistoryDto {
    id?: number;
    inactive: boolean;
}
export declare class UpdateContentHistoryForm {
    contentHistory: UpdateContentHistoryDto;
}
