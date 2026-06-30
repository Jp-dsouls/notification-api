import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateChannelDto {
  @ApiProperty({ description: 'Channel name', example: 'Email' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Provider configuration schema', example: { provider: 'smtp', host: 'smtp.example.com' } })
  configSchema: unknown;
}
