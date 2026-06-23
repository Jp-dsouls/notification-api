import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductStatusDto } from './dto/update-product-status.dto';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    create(createProductDto: CreateProductDto): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        apiKey: string;
        status: boolean;
    }>;
    findAll(page?: number, limit?: number): Promise<{
        data: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            apiKey: string;
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
        })[];
    } & {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        apiKey: string;
        status: boolean;
    }>;
    updateStatus(id: string, updateProductStatusDto: UpdateProductStatusDto): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        apiKey: string;
        status: boolean;
    }>;
}
