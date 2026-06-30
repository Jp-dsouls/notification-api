import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { ProductChannelsService } from './product-channels.service';
import { AssignChannelDto } from './dto/assign-channel.dto';

@ApiTags('product-channels')
@Controller('products/:productId/channels')
export class ProductChannelsController {
  constructor(private readonly productChannelsService: ProductChannelsService) {}

  @Post(':channelId')
  @ApiOperation({ summary: 'Assign a channel to a product' })
  @ApiParam({ name: 'productId', description: 'Product UUID' })
  @ApiParam({ name: 'channelId', description: 'Channel UUID' })
  @ApiResponse({ status: 201, description: 'Channel assigned to product' })
  @ApiResponse({ status: 404, description: 'Product or channel not found' })
  assignChannel(
    @Param('productId') productId: string,
    @Param('channelId') channelId: string,
    @Body() dto: AssignChannelDto,
  ) {
    return this.productChannelsService.assignChannel(productId, channelId, dto);
  }

  @Delete(':channelId')
  @ApiOperation({ summary: 'Remove channel association from product' })
  @ApiParam({ name: 'productId', description: 'Product UUID' })
  @ApiParam({ name: 'channelId', description: 'Channel UUID' })
  @ApiResponse({ status: 200, description: 'Channel removed from product' })
  @ApiResponse({ status: 404, description: 'Association not found' })
  removeChannel(
    @Param('productId') productId: string,
    @Param('channelId') channelId: string,
  ) {
    return this.productChannelsService.removeChannel(productId, channelId);
  }

  @Put(':channelId')
  @ApiOperation({ summary: 'Enable/disable a channel for a product' })
  @ApiParam({ name: 'productId', description: 'Product UUID' })
  @ApiParam({ name: 'channelId', description: 'Channel UUID' })
  @ApiResponse({ status: 200, description: 'Channel status updated' })
  @ApiResponse({ status: 404, description: 'Association not found' })
  updateChannelStatus(
    @Param('productId') productId: string,
    @Param('channelId') channelId: string,
    @Body() dto: AssignChannelDto,
  ) {
    return this.productChannelsService.updateChannelStatus(productId, channelId, dto);
  }

  @Get()
  @ApiOperation({ summary: 'List channels assigned to a product' })
  @ApiParam({ name: 'productId', description: 'Product UUID' })
  @ApiResponse({ status: 200, description: 'List of product channels' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  getProductChannels(@Param('productId') productId: string) {
    return this.productChannelsService.getProductChannels(productId);
  }
}
