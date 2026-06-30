import { IsBoolean, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class AssignChannelDto {
  @ApiPropertyOptional({ description: 'Channel enabled status', example: true })
  @IsBoolean()
  @IsOptional()
  isEnabled?: boolean;
}
