import { PrismaService } from '../prisma/prisma.service';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';
export declare class TemplatesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createTemplateDto: CreateTemplateDto): Promise<{
        product: {
            name: string;
        };
        channel: {
            name: string;
        };
    } & {
        name: string;
        id: string;
        productId: string;
        channelId: string;
        body: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(productId?: string, channelId?: string): Promise<({
        product: {
            name: string;
        };
        channel: {
            name: string;
        };
    } & {
        name: string;
        id: string;
        productId: string;
        channelId: string;
        body: string;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    findOne(id: string): Promise<{
        product: {
            name: string;
        };
        channel: {
            name: string;
        };
    } & {
        name: string;
        id: string;
        productId: string;
        channelId: string;
        body: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, updateTemplateDto: UpdateTemplateDto): Promise<{
        name: string;
        id: string;
        productId: string;
        channelId: string;
        body: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
