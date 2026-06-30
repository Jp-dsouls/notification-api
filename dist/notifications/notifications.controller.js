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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const notifications_service_1 = require("./notifications.service");
const send_notification_dto_1 = require("./dto/send-notification.dto");
const correlation_id_decorator_1 = require("../common/decorators/correlation-id.decorator");
let NotificationsController = class NotificationsController {
    constructor(notificationsService) {
        this.notificationsService = notificationsService;
    }
    send(productId, dto, correlationId) {
        return this.notificationsService.send(productId, dto, correlationId);
    }
    findOne(id) {
        return this.notificationsService.findOne(id);
    }
    findAll(productId, page, limit) {
        return this.notificationsService.findAll(productId, page || 1, limit || 10);
    }
};
exports.NotificationsController = NotificationsController;
__decorate([
    (0, common_1.Post)('send'),
    (0, swagger_1.ApiOperation)({ summary: 'Send a notification (enqueue for processing)' }),
    (0, swagger_1.ApiHeader)({ name: 'X-Product-ID', description: 'Product ID (injected by gateway)', required: true }),
    (0, swagger_1.ApiResponse)({ status: 202, description: 'Notification queued successfully' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Template does not belong to product or channel disabled' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Template not found' }),
    __param(0, (0, common_1.Headers)('x-product-id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, correlation_id_decorator_1.CorrelationId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, send_notification_dto_1.SendNotificationDto, String]),
    __metadata("design:returntype", void 0)
], NotificationsController.prototype, "send", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get notification status by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Notification UUID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Notification status' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], NotificationsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'List notifications (paginated)' }),
    (0, swagger_1.ApiQuery)({ name: 'product_id', required: false, description: 'Filter by product UUID' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, example: 1 }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, example: 10 }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of notifications' }),
    __param(0, (0, common_1.Query)('product_id')),
    __param(1, (0, common_1.Query)('page', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)('limit', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", void 0)
], NotificationsController.prototype, "findAll", null);
exports.NotificationsController = NotificationsController = __decorate([
    (0, swagger_1.ApiTags)('notifications'),
    (0, common_1.Controller)('notifications'),
    __metadata("design:paramtypes", [notifications_service_1.NotificationsService])
], NotificationsController);
//# sourceMappingURL=notifications.controller.js.map