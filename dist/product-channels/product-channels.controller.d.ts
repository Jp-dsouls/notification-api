import { ProductChannelsService } from './product-channels.service';
import { AssignChannelDto } from './dto/assign-channel.dto';
export declare class ProductChannelsController {
    private readonly productChannelsService;
    constructor(productChannelsService: ProductChannelsService);
    assignChannel(productId: string, channelId: string, dto: AssignChannelDto): Promise<{
        id: string;
        productId: string;
        channelId: string;
        createdAt: Date;
        updatedAt: Date;
        isEnabled: boolean;
    }>;
    removeChannel(productId: string, channelId: string): Promise<{
        message: string;
    }>;
    updateChannelStatus(productId: string, channelId: string, dto: AssignChannelDto): Promise<{
        id: string;
        productId: string;
        channelId: string;
        createdAt: Date;
        updatedAt: Date;
        isEnabled: boolean;
    }>;
    getProductChannels(productId: string): Promise<({
        channel: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            configSchema: import("@prisma/client/runtime/library").JsonValue;
        };
    } & {
        id: string;
        productId: string;
        channelId: string;
        createdAt: Date;
        updatedAt: Date;
        isEnabled: boolean;
    })[]>;
}
