import { PrismaService } from '../prisma/prisma.service';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';
import { Prisma } from '@prisma/client';
export declare class ChannelsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createChannelDto: CreateChannelDto): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        configSchema: Prisma.JsonValue;
    }>;
    findAll(): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        configSchema: Prisma.JsonValue;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        configSchema: Prisma.JsonValue;
    }>;
    update(id: string, updateChannelDto: UpdateChannelDto): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        configSchema: Prisma.JsonValue;
    }>;
}
