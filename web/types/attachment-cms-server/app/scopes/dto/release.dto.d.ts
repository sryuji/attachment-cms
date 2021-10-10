import { BaseDto } from '../../base/base.dto';
export declare class ReleaseDto extends BaseDto {
    readonly scopeId: number;
    readonly sourceReleaseId: number;
}
export declare class PublishReleaseDto extends BaseDto {
    readonly releasedAt: Date;
}
export declare class CreateReleaseForm {
    release: ReleaseDto;
}
export declare class PublishReleaseForm {
    release: PublishReleaseDto;
}
