import { IsOptional } from 'class-validator';

export class UpdateChannelDto {
  @IsOptional()
  configSchema?: unknown;
}
