import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductStatusDto } from './dto/update-product-status.dto';
export declare class ProductsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createProductDto: CreateProductDto): Promise<{
        apiKey: string;
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: boolean;
    }>;
    findAll(page?: number, limit?: number): Promise<{
        data: {
            apiKey: string;
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: boolean;
        }[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    findOne(id: string): Promise<{
        productChannels: ({
            channel: {
                name: string;
                id: string;
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
        })[];
    } & {
        apiKey: string;
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: boolean;
    }>;
    findByApiKey(apiKey: string): Promise<{
        apiKey: string;
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: boolean;
    }>;
    updateStatus(id: string, updateProductStatusDto: UpdateProductStatusDto): Promise<{
        apiKey: string;
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: boolean;
    }>;
}
