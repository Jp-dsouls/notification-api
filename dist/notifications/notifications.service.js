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
exports.NotificationsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const uuid_1 = require("uuid");
const exceptions_1 = require("../common/exceptions");
let NotificationsService = class NotificationsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async send(productId, dto, correlationId) {
        const template = await this.prisma.template.findUnique({
            where: { id: dto.templateId },
            include: {
                product: true,
                channel: true,
            },
        });
        if (!template) {
            throw new exceptions_1.TemplateNotFoundException(dto.templateId);
        }
        if (template.productId !== productId) {
            throw new exceptions_1.TemplateNotBelongToProductException();
        }
        const channelAssociation = await this.prisma.productChannel.findUnique({
            where: {
                productId_channelId: {
                    productId: template.productId,
                    channelId: template.channelId,
                },
            },
        });
        if (!channelAssociation || !channelAssociation.isEnabled) {
            throw new exceptions_1.ChannelDisabledException(template.channel.name);
        }
        const content = this.renderTemplate(template.body, dto.variables || {});
        const notificationId = (0, uuid_1.v4)();
        const payload = {
            notificationId,
            productId: template.productId,
            channel: template.channel.name,
            destination: dto.destination,
            content,
            timestamp: new Date().toISOString(),
        };
        console.log(JSON.stringify({
            timestamp: new Date().toISOString(),
            level: 'INFO',
            service: 'notification-api',
            context: 'NotificationsService.send',
            correlationId,
            notificationId,
            message: 'Notification queued',
            payload,
        }));
        return {
            notificationId,
            status: 'queued',
            channel: template.channel.name,
            destination: dto.destination,
            timestamp: payload.timestamp,
        };
    }
    renderTemplate(body, variables) {
        return body.replace(/\{\{(\w+)\}\}/g, (match, key) => {
            return variables[key] !== undefined ? variables[key] : match;
        });
    }
    async findOne(id) {
        return {
            notificationId: id,
            status: 'pending',
            message: 'Check channel-worker logs for status',
        };
    }
    async findAll(productId, page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        return {
            data: [],
            total: 0,
            page,
            limit,
            totalPages: 0,
            message: 'Notification logs are stored in MongoDB by channel-worker',
        };
    }
};
exports.NotificationsService = NotificationsService;
exports.NotificationsService = NotificationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], NotificationsService);
//# sourceMappingURL=notifications.service.js.map