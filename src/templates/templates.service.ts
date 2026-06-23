import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';
import {
  ProductNotFoundException,
  ProductInactiveException,
  ChannelNotAssociatedException,
  ChannelDisabledException,
  TemplateNotFoundException,
} from '../common/exceptions';

@Injectable()
export class TemplatesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTemplateDto: CreateTemplateDto) {
    const product = await this.prisma.product.findUnique({
      where: { id: createTemplateDto.productId },
    });

    if (!product) {
      throw new ProductNotFoundException(createTemplateDto.productId);
    }

    if (!product.status) {
      throw new ProductInactiveException(product.name);
    }

    const channelAssociation = await this.prisma.productChannel.findUnique({
      where: {
        productId_channelId: {
          productId: createTemplateDto.productId,
          channelId: createTemplateDto.channelId,
        },
      },
    });

    if (!channelAssociation) {
      throw new ChannelNotAssociatedException();
    }

    if (!channelAssociation.isEnabled) {
      const channel = await this.prisma.channel.findUnique({
        where: { id: channelAssociation.channelId },
      });
      throw new ChannelDisabledException(channel?.name || channelAssociation.channelId);
    }

    return this.prisma.template.create({
      data: {
        productId: createTemplateDto.productId,
        channelId: createTemplateDto.channelId,
        name: createTemplateDto.name,
        body: createTemplateDto.body,
      },
      include: {
        product: { select: { name: true } },
        channel: { select: { name: true } },
      },
    });
  }

  async findAll(productId?: string, channelId?: string) {
    const where: Record<string, unknown> = {};

    if (productId) {
      where.productId = productId;
    }

    if (channelId) {
      where.channelId = channelId;
    }

    return this.prisma.template.findMany({
      where,
      include: {
        product: { select: { name: true } },
        channel: { select: { name: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const template = await this.prisma.template.findUnique({
      where: { id },
      include: {
        product: { select: { name: true } },
        channel: { select: { name: true } },
      },
    });

    if (!template) {
      throw new TemplateNotFoundException(id);
    }

    return template;
  }

  async update(id: string, updateTemplateDto: UpdateTemplateDto) {
    const template = await this.prisma.template.findUnique({ where: { id } });

    if (!template) {
      throw new TemplateNotFoundException(id);
    }

    return this.prisma.template.update({
      where: { id },
      data: {
        name: updateTemplateDto.name,
        body: updateTemplateDto.body,
      },
    });
  }

  async remove(id: string) {
    const template = await this.prisma.template.findUnique({ where: { id } });

    if (!template) {
      throw new TemplateNotFoundException(id);
    }

    await this.prisma.template.delete({ where: { id } });

    return { message: 'Template deleted successfully' };
  }
}
