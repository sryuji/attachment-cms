import { BaseDto } from '../../base/base.dto';
export declare class UpdateContentHistoryDto extends BaseDto {
    scopeId: number;
    path: string;
    selector: string;
    content: string;
    action: string;
    inactive: boolean;
}
export declare class UpdateContentHistoryForm {
    contentHistory: UpdateContentHistoryDto;
}
