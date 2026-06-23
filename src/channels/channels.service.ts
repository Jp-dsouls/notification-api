import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';
import { Prisma } from '@prisma/client';
import {
  ChannelAlreadyExistsException,
  ChannelNotFoundException,
} from '../common/exceptions';

@Injectable()
export class ChannelsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createChannelDto: CreateChannelDto) {
    const existing = await this.prisma.channel.findUnique({
      where: { name: createChannelDto.name },
    });

    if (existing) {
      throw new ChannelAlreadyExistsException(createChannelDto.name);
    }

    return this.prisma.channel.create({
      data: {
        name: createChannelDto.name,
        configSchema: createChannelDto.configSchema as Prisma.InputJsonValue,
      },
    });
  }

  async findAll() {
    return this.prisma.channel.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const channel = await this.prisma.channel.findUnique({
      where: { id },
    });

    if (!channel) {
      throw new ChannelNotFoundException(id);
    }

    return channel;
  }

  async update(id: string, updateChannelDto: UpdateChannelDto) {
    const channel = await this.prisma.channel.findUnique({ where: { id } });

    if (!channel) {
      throw new ChannelNotFoundException(id);
    }

    return this.prisma.channel.update({
      where: { id },
      data: { configSchema: updateChannelDto.configSchema as Prisma.InputJsonValue },
    });
  }
}
