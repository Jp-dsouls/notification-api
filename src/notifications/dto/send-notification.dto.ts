import { IsNotEmpty, IsString, IsUUID, IsObject, IsOptional } from 'class-validator';

export class SendNotificationDto {
  @IsUUID()
  @IsNotEmpty()
  templateId: string;

  @IsString()
  @IsNotEmpty()
  destination: string;

  @IsObject()
  @IsOptional()
  variables?: Record<string, string>;
}
