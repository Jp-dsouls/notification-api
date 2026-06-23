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
exports.ProductChannelsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const exceptions_1 = require("../common/exceptions");
let ProductChannelsService = class ProductChannelsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async assignChannel(productId, channelId, dto) {
        const product = await this.prisma.product.findUnique({ where: { id: productId } });
        if (!product) {
            throw new exceptions_1.ProductNotFoundException(productId);
        }
        const channel = await this.prisma.channel.findUnique({ where: { id: channelId } });
        if (!channel) {
            throw new exceptions_1.ChannelNotFoundException(channelId);
        }
        return this.prisma.productChannel.upsert({
            where: {
                productId_channelId: { productId, channelId },
            },
            update: {
                isEnabled: dto.isEnabled ?? true,
            },
            create: {
                productId,
                channelId,
                isEnabled: dto.isEnabled ?? true,
            },
        });
    }
    async removeChannel(productId, channelId) {
        const relation = await this.prisma.productChannel.findUnique({
            where: {
                productId_channelId: { productId, channelId },
            },
        });
        if (!relation) {
            throw new exceptions_1.ChannelNotAssociatedException();
        }
        await this.prisma.productChannel.delete({
            where: {
                productId_channelId: { productId, channelId },
            },
        });
        return { message: 'Channel removed from product successfully' };
    }
    async updateChannelStatus(productId, channelId, dto) {
        const relation = await this.prisma.productChannel.findUnique({
            where: {
                productId_channelId: { productId, channelId },
            },
        });
        if (!relation) {
            throw new exceptions_1.ChannelNotAssociatedException();
        }
        return this.prisma.productChannel.update({
            where: {
                productId_channelId: { productId, channelId },
            },
            data: { isEnabled: dto.isEnabled },
        });
    }
    async getProductChannels(productId) {
        const product = await this.prisma.product.findUnique({ where: { id: productId } });
        if (!product) {
            throw new exceptions_1.ProductNotFoundException(productId);
        }
        return this.prisma.productChannel.findMany({
            where: { productId },
            include: { channel: true },
            orderBy: { createdAt: 'desc' },
        });
    }
    async isChannelEnabled(productId, channelId) {
        const relation = await this.prisma.productChannel.findUnique({
            where: {
                productId_channelId: { productId, channelId },
            },
        });
        return !!relation?.isEnabled;
    }
};
exports.ProductChannelsService = ProductChannelsService;
exports.ProductChannelsService = ProductChannelsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductChannelsService);
//# sourceMappingURL=product-channels.service.js.map