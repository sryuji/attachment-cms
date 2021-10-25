import { BaseDto } from '../../base/base.dto';
export declare class UpdateReleaseDto extends BaseDto {
    name: string;
}
export declare class CreateReleaseDto extends UpdateReleaseDto {
    scopeId: number;
    sourceReleaseId: number;
}
export declare class PublishReleaseDto extends BaseDto {
    releasedAt: Date;
}
export declare class CreateReleaseForm {
    release: CreateReleaseDto;
}
export declare class UpdateReleaseForm {
    release: UpdateReleaseDto;
}
export declare class PublishReleaseForm {
    release: PublishReleaseDto;
}
