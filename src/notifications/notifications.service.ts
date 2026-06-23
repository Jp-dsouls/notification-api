import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SendNotificationDto } from './dto/send-notification.dto';
import { v4 as uuidv4 } from 'uuid';
import {
  TemplateNotFoundException,
  TemplateNotBelongToProductException,
  ChannelDisabledException,
} from '../common/exceptions';

@Injectable()
export class NotificationsService {
  constructor(private readonly prisma: PrismaService) {}

  async send(productId: string, dto: SendNotificationDto, correlationId: string) {
    const template = await this.prisma.template.findUnique({
      where: { id: dto.templateId },
      include: {
        product: true,
        channel: true,
      },
    });

    if (!template) {
      throw new TemplateNotFoundException(dto.templateId);
    }

    if (template.productId !== productId) {
      throw new TemplateNotBelongToProductException();
    }

    const channelAssociation = await this.prisma.productChannel.findUnique({
      where: {
        productId_channelId: {
          productId: template.productId,
          channelId: template.channelId,
        },
      },
    });

    if (!channelAssociation || !channelAssociation.isEnabled) {
      throw new ChannelDisabledException(template.channel.name);
    }

    const content = this.renderTemplate(template.body, dto.variables || {});
    const notificationId = uuidv4();

    const payload = {
      notificationId,
      productId: template.productId,
      channel: template.channel.name,
      destination: dto.destination,
      content,
      timestamp: new Date().toISOString(),
    };

    console.log(
      JSON.stringify({
        timestamp: new Date().toISOString(),
        level: 'INFO',
        service: 'notification-api',
        context: 'NotificationsService.send',
        correlationId,
        notificationId,
        message: 'Notification queued',
        payload,
      }),
    );

    return {
      notificationId,
      status: 'queued',
      channel: template.channel.name,
      destination: dto.destination,
      timestamp: payload.timestamp,
    };
  }

  private renderTemplate(body: string, variables: Record<string, string>): string {
    return body.replace(/\{\{(\w+)\}\}/g, (match, key) => {
      return variables[key] !== undefined ? variables[key] : match;
    });
  }

  async findOne(id: string) {
    return {
      notificationId: id,
      status: 'pending',
      message: 'Check channel-worker logs for status',
    };
  }

  async findAll(productId?: string, page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    return {
      data: [],
      total: 0,
      page,
      limit,
      totalPages: 0,
      message: 'Notification logs are stored in MongoDB by channel-worker',
    };
  }
}
