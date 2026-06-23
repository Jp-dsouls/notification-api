import { IsBoolean, IsOptional } from 'class-validator';

export class AssignChannelDto {
  @IsBoolean()
  @IsOptional()
  isEnabled?: boolean;
}
