import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class UpdateTemplateDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  name?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  body?: string;
}
