import { IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductStatusDto {
  @ApiProperty({ description: 'Product active status', example: true })
  @IsBoolean()
  status: boolean;
}
