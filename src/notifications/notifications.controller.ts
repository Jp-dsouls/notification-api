import { Controller, Get, Post, Body, Param, Query, Headers, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiHeader } from '@nestjs/swagger';
import { NotificationsService } from './notifications.service';
import { SendNotificationDto } from './dto/send-notification.dto';
import { CorrelationId } from '../common/decorators/correlation-id.decorator';

@ApiTags('notifications')
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post('send')
  @ApiOperation({ summary: 'Send a notification (enqueue for processing)' })
  @ApiHeader({ name: 'X-Product-ID', description: 'Product ID (injected by gateway)', required: true })
  @ApiResponse({ status: 202, description: 'Notification queued successfully' })
  @ApiResponse({ status: 403, description: 'Template does not belong to product or channel disabled' })
  @ApiResponse({ status: 404, description: 'Template not found' })
  send(
    @Headers('x-product-id') productId: string,
    @Body() dto: SendNotificationDto,
    @CorrelationId() correlationId: string,
  ) {
    return this.notificationsService.send(productId, dto, correlationId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get notification status by ID' })
  @ApiParam({ name: 'id', description: 'Notification UUID' })
  @ApiResponse({ status: 200, description: 'Notification status' })
  findOne(@Param('id') id: string) {
    return this.notificationsService.findOne(id);
  }

  @Get()
  @ApiOperation({ summary: 'List notifications (paginated)' })
  @ApiQuery({ name: 'product_id', required: false, description: 'Filter by product UUID' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  @ApiResponse({ status: 200, description: 'List of notifications' })
  findAll(
    @Query('product_id') productId?: string,
    @Query('page', ParseIntPipe) page?: number,
    @Query('limit', ParseIntPipe) limit?: number,
  ) {
    return this.notificationsService.findAll(productId, page || 1, limit || 10);
  }
}
