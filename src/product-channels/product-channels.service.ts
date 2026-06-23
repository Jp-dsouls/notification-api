import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AssignChannelDto } from './dto/assign-channel.dto';
import {
  ProductNotFoundException,
  ChannelNotFoundException,
  ChannelNotAssociatedException,
} from '../common/exceptions';

@Injectable()
export class ProductChannelsService {
  constructor(private readonly prisma: PrismaService) {}

  async assignChannel(productId: string, channelId: string, dto: AssignChannelDto) {
    const product = await this.prisma.product.findUnique({ where: { id: productId } });
    if (!product) {
      throw new ProductNotFoundException(productId);
    }

    const channel = await this.prisma.channel.findUnique({ where: { id: channelId } });
    if (!channel) {
      throw new ChannelNotFoundException(channelId);
    }

    return this.prisma.productChannel.upsert({
      where: {
        productId_channelId: { productId, channelId },
      },
      update: {
        isEnabled: dto.isEnabled ?? true,
      },
      create: {
        productId,
        channelId,
        isEnabled: dto.isEnabled ?? true,
      },
    });
  }

  async removeChannel(productId: string, channelId: string) {
    const relation = await this.prisma.productChannel.findUnique({
      where: {
        productId_channelId: { productId, channelId },
      },
    });

    if (!relation) {
      throw new ChannelNotAssociatedException();
    }

    await this.prisma.productChannel.delete({
      where: {
        productId_channelId: { productId, channelId },
      },
    });

    return { message: 'Channel removed from product successfully' };
  }

  async updateChannelStatus(productId: string, channelId: string, dto: AssignChannelDto) {
    const relation = await this.prisma.productChannel.findUnique({
      where: {
        productId_channelId: { productId, channelId },
      },
    });

    if (!relation) {
      throw new ChannelNotAssociatedException();
    }

    return this.prisma.productChannel.update({
      where: {
        productId_channelId: { productId, channelId },
      },
      data: { isEnabled: dto.isEnabled },
    });
  }

  async getProductChannels(productId: string) {
    const product = await this.prisma.product.findUnique({ where: { id: productId } });
    if (!product) {
      throw new ProductNotFoundException(productId);
    }

    return this.prisma.productChannel.findMany({
      where: { productId },
      include: { channel: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async isChannelEnabled(productId: string, channelId: string): Promise<boolean> {
    const relation = await this.prisma.productChannel.findUnique({
      where: {
        productId_channelId: { productId, channelId },
      },
    });

    return !!relation?.isEnabled;
  }
}
