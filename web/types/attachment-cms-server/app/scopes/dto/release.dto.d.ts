import { UpdatableDto } from '../../base/updatable.dto';
export declare class UpdateReleaseDto extends UpdatableDto {
    name: string;
}
export declare class CreateReleaseDto {
    name: string;
    scopeId: number;
    sourceReleaseId: number;
}
export declare class PublishReleaseDto extends UpdatableDto {
    releasedAt?: Date;
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
