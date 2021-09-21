import { BaseDto } from '../../base/base.dto'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsNotEmpty, IsDate, IsInt, ValidateNested, IsOptional } from 'class-validator'
import { Type } from 'class-transformer'

export class ReleaseDto extends BaseDto {
  @ApiProperty({ description: 'scope ID', example: 1 })
  @IsNotEmpty()
  @IsInt()
  readonly scopeId: number

  @ApiPropertyOptional({
    description: '編集対象にしたいリリースID. 未指定だと最新のものが自動的に選ばれる',
    example: null,
  })
  @IsOptional()
  @IsInt()
  readonly sourceReleaseId: number
}

export class PublishReleaseDto extends BaseDto {
  @ApiPropertyOptional({
    default: null,
    description: 'リリース日',
    example: new Date(),
  })
  @IsDate()
  @Type(() => Date)
  readonly releasedAt: Date
}

/**
 * Swagger連携時、Form定義がなしで、@Body('property')形式を使うとrequest bodyのDocument表示が巧くいかない
 * そのため、@Body()でbody全体を表現したFormをinject対象にしている
 */
export class CreateReleaseForm {
  @ApiProperty()
  @ValidateNested()
  @Type(() => ReleaseDto)
  release: ReleaseDto
}

export class PublishReleaseForm {
  @ApiProperty()
  @ValidateNested()
  @Type(() => PublishReleaseDto)
  release: PublishReleaseDto
}
