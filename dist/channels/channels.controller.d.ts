import { ChannelsService } from './channels.service';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';
export declare class ChannelsController {
    private readonly channelsService;
    constructor(channelsService: ChannelsService);
    create(createChannelDto: CreateChannelDto): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        configSchema: import("@prisma/client/runtime/library").JsonValue;
    }>;
    findAll(): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        configSchema: import("@prisma/client/runtime/library").JsonValue;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        configSchema: import("@prisma/client/runtime/library").JsonValue;
    }>;
    update(id: string, updateChannelDto: UpdateChannelDto): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        configSchema: import("@prisma/client/runtime/library").JsonValue;
    }>;
}
