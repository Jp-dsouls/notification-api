import { IsNotEmpty, IsString, IsUUID, IsObject, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SendNotificationDto {
  @ApiProperty({ description: 'Template UUID to use for this notification' })
  @IsUUID()
  @IsNotEmpty()
  templateId: string;

  @ApiProperty({ description: 'Destination (email, phone number, etc.)', example: 'user@example.com' })
  @IsString()
  @IsNotEmpty()
  destination: string;

  @ApiPropertyOptional({ description: 'Variables to replace in template body', example: { name: 'John', company: 'Acme' } })
  @IsObject()
  @IsOptional()
  variables?: Record<string, string>;
}
