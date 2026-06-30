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
exports.ProductChannelsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const product_channels_service_1 = require("./product-channels.service");
const assign_channel_dto_1 = require("./dto/assign-channel.dto");
let ProductChannelsController = class ProductChannelsController {
    constructor(productChannelsService) {
        this.productChannelsService = productChannelsService;
    }
    assignChannel(productId, channelId, dto) {
        return this.productChannelsService.assignChannel(productId, channelId, dto);
    }
    removeChannel(productId, channelId) {
        return this.productChannelsService.removeChannel(productId, channelId);
    }
    updateChannelStatus(productId, channelId, dto) {
        return this.productChannelsService.updateChannelStatus(productId, channelId, dto);
    }
    getProductChannels(productId) {
        return this.productChannelsService.getProductChannels(productId);
    }
};
exports.ProductChannelsController = ProductChannelsController;
__decorate([
    (0, common_1.Post)(':channelId'),
    (0, swagger_1.ApiOperation)({ summary: 'Assign a channel to a product' }),
    (0, swagger_1.ApiParam)({ name: 'productId', description: 'Product UUID' }),
    (0, swagger_1.ApiParam)({ name: 'channelId', description: 'Channel UUID' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Channel assigned to product' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Product or channel not found' }),
    __param(0, (0, common_1.Param)('productId')),
    __param(1, (0, common_1.Param)('channelId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, assign_channel_dto_1.AssignChannelDto]),
    __metadata("design:returntype", void 0)
], ProductChannelsController.prototype, "assignChannel", null);
__decorate([
    (0, common_1.Delete)(':channelId'),
    (0, swagger_1.ApiOperation)({ summary: 'Remove channel association from product' }),
    (0, swagger_1.ApiParam)({ name: 'productId', description: 'Product UUID' }),
    (0, swagger_1.ApiParam)({ name: 'channelId', description: 'Channel UUID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Channel removed from product' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Association not found' }),
    __param(0, (0, common_1.Param)('productId')),
    __param(1, (0, common_1.Param)('channelId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ProductChannelsController.prototype, "removeChannel", null);
__decorate([
    (0, common_1.Put)(':channelId'),
    (0, swagger_1.ApiOperation)({ summary: 'Enable/disable a channel for a product' }),
    (0, swagger_1.ApiParam)({ name: 'productId', description: 'Product UUID' }),
    (0, swagger_1.ApiParam)({ name: 'channelId', description: 'Channel UUID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Channel status updated' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Association not found' }),
    __param(0, (0, common_1.Param)('productId')),
    __param(1, (0, common_1.Param)('channelId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, assign_channel_dto_1.AssignChannelDto]),
    __metadata("design:returntype", void 0)
], ProductChannelsController.prototype, "updateChannelStatus", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'List channels assigned to a product' }),
    (0, swagger_1.ApiParam)({ name: 'productId', description: 'Product UUID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of product channels' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Product not found' }),
    __param(0, (0, common_1.Param)('productId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductChannelsController.prototype, "getProductChannels", null);
exports.ProductChannelsController = ProductChannelsController = __decorate([
    (0, swagger_1.ApiTags)('product-channels'),
    (0, common_1.Controller)('products/:productId/channels'),
    __metadata("design:paramtypes", [product_channels_service_1.ProductChannelsService])
], ProductChannelsController);
//# sourceMappingURL=product-channels.controller.js.map