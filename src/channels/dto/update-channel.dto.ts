import { IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateChannelDto {
  @ApiPropertyOptional({ description: 'Updated provider configuration schema' })
  @IsOptional()
  configSchema?: unknown;
}
