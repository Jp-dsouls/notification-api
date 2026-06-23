import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ProductChannelsService } from './product-channels.service';
import { AssignChannelDto } from './dto/assign-channel.dto';

@Controller('products/:productId/channels')
export class ProductChannelsController {
  constructor(private readonly productChannelsService: ProductChannelsService) {}

  @Post(':channelId')
  assignChannel(
    @Param('productId') productId: string,
    @Param('channelId') channelId: string,
    @Body() dto: AssignChannelDto,
  ) {
    return this.productChannelsService.assignChannel(productId, channelId, dto);
  }

  @Delete(':channelId')
  removeChannel(
    @Param('productId') productId: string,
    @Param('channelId') channelId: string,
  ) {
    return this.productChannelsService.removeChannel(productId, channelId);
  }

  @Put(':channelId')
  updateChannelStatus(
    @Param('productId') productId: string,
    @Param('channelId') channelId: string,
    @Body() dto: AssignChannelDto,
  ) {
    return this.productChannelsService.updateChannelStatus(productId, channelId, dto);
  }

  @Get()
  getProductChannels(@Param('productId') productId: string) {
    return this.productChannelsService.getProductChannels(productId);
  }
}
