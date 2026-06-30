import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ description: 'Product name', example: 'E-commerce' })
  @IsString()
  @IsNotEmpty()
  name: string;
}
