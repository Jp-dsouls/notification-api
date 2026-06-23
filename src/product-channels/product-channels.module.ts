import { Module } from '@nestjs/common';
import { ProductChannelsService } from './product-channels.service';
import { ProductChannelsController } from './product-channels.controller';

@Module({
  controllers: [ProductChannelsController],
  providers: [ProductChannelsService],
  exports: [ProductChannelsService],
})
export class ProductChannelsModule {}
