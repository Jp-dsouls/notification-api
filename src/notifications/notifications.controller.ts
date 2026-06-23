import { Controller, Get, Post, Body, Param, Query, Headers, ParseIntPipe } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { SendNotificationDto } from './dto/send-notification.dto';
import { CorrelationId } from '../common/decorators/correlation-id.decorator';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post('send')
  send(
    @Headers('x-product-id') productId: string,
    @Body() dto: SendNotificationDto,
    @CorrelationId() correlationId: string,
  ) {
    return this.notificationsService.send(productId, dto, correlationId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notificationsService.findOne(id);
  }

  @Get()
  findAll(
    @Query('product_id') productId?: string,
    @Query('page', ParseIntPipe) page?: number,
    @Query('limit', ParseIntPipe) limit?: number,
  ) {
    return this.notificationsService.findAll(productId, page || 1, limit || 10);
  }
}
