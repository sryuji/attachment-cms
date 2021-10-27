import { IsNotEmpty, Allow, IsIn } from 'class-validator'
import { BaseDto } from '../../base/base.dto'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { ContentHistoryAction } from '../../../enum/content-history-action.enum'

export class ContentHistoryDto extends BaseDto {
  @ApiProperty({
    description: 'コンテンツの存在するパス',
    example: '/api-docs',
  })
  @IsNotEmpty()
  path: string

  @ApiProperty({
    description: '処理対象のselector',
    example: '#operations-tag-コンテンツ管理対象 > a',
  })
  @IsNotEmpty()
  selector: string

  @ApiPropertyOptional({
    description: 'selectorに対してactionを行う置換/挿入するhtmlコンテンツ',
    example: '<span>コンテンツ</span>',
  })
  @Allow()
  content: string

  @ApiProperty({
    enum: Object.values(ContentHistoryAction),
    description: 'selectorに対してactionを行う、その処理対象のhtmlコンテンツ',
  })
  @IsIn(Object.values(ContentHistoryAction))
  action: string
}
