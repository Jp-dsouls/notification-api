"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplatesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const exceptions_1 = require("../common/exceptions");
let TemplatesService = class TemplatesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createTemplateDto) {
        const product = await this.prisma.product.findUnique({
            where: { id: createTemplateDto.productId },
        });
        if (!product) {
            throw new exceptions_1.ProductNotFoundException(createTemplateDto.productId);
        }
        if (!product.status) {
            throw new exceptions_1.ProductInactiveException(product.name);
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
            throw new exceptions_1.ChannelNotAssociatedException();
        }
        if (!channelAssociation.isEnabled) {
            const channel = await this.prisma.channel.findUnique({
                where: { id: channelAssociation.channelId },
            });
            throw new exceptions_1.ChannelDisabledException(channel?.name || channelAssociation.channelId);
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
    async findAll(productId, channelId) {
        const where = {};
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
    async findOne(id) {
        const template = await this.prisma.template.findUnique({
            where: { id },
            include: {
                product: { select: { name: true } },
                channel: { select: { name: true } },
            },
        });
        if (!template) {
            throw new exceptions_1.TemplateNotFoundException(id);
        }
        return template;
    }
    async update(id, updateTemplateDto) {
        const template = await this.prisma.template.findUnique({ where: { id } });
        if (!template) {
            throw new exceptions_1.TemplateNotFoundException(id);
        }
        return this.prisma.template.update({
            where: { id },
            data: {
                name: updateTemplateDto.name,
                body: updateTemplateDto.body,
            },
        });
    }
    async remove(id) {
        const template = await this.prisma.template.findUnique({ where: { id } });
        if (!template) {
            throw new exceptions_1.TemplateNotFoundException(id);
        }
        await this.prisma.template.delete({ where: { id } });
        return { message: 'Template deleted successfully' };
    }
};
exports.TemplatesService = TemplatesService;
exports.TemplatesService = TemplatesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TemplatesService);
//# sourceMappingURL=templates.service.js.map