import { TemplatesService } from './templates.service';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';
export declare class TemplatesController {
    private readonly templatesService;
    constructor(templatesService: TemplatesService);
    create(createTemplateDto: CreateTemplateDto): Promise<{
        product: {
            name: string;
        };
        channel: {
            name: string;
        };
    } & {
        id: string;
        productId: string;
        channelId: string;
        name: string;
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
        id: string;
        productId: string;
        channelId: string;
        name: string;
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
        id: string;
        productId: string;
        channelId: string;
        name: string;
        body: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, updateTemplateDto: UpdateTemplateDto): Promise<{
        id: string;
        productId: string;
        channelId: string;
        name: string;
        body: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
