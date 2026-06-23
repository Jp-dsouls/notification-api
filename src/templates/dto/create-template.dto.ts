import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateTemplateDto {
  @IsUUID()
  @IsNotEmpty()
  productId: string;

  @IsUUID()
  @IsNotEmpty()
  channelId: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  body: string;
}
