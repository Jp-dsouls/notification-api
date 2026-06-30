import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTemplateDto {
  @ApiProperty({ description: 'Product UUID', example: 'c7c779f5-a50b-4271-926b-347934e9cf50' })
  @IsUUID()
  @IsNotEmpty()
  productId: string;

  @ApiProperty({ description: 'Channel UUID', example: 'adb96f0b-7edd-4a6a-86a5-cda529eaf290' })
  @IsUUID()
  @IsNotEmpty()
  channelId: string;

  @ApiProperty({ description: 'Template name', example: 'Welcome Email' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Template body with {{variable}} placeholders', example: 'Hello {{name}}, welcome to {{company}}!' })
  @IsString()
  @IsNotEmpty()
  body: string;
}
