"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductChannelsModule = void 0;
const common_1 = require("@nestjs/common");
const product_channels_service_1 = require("./product-channels.service");
const product_channels_controller_1 = require("./product-channels.controller");
let ProductChannelsModule = class ProductChannelsModule {
};
exports.ProductChannelsModule = ProductChannelsModule;
exports.ProductChannelsModule = ProductChannelsModule = __decorate([
    (0, common_1.Module)({
        controllers: [product_channels_controller_1.ProductChannelsController],
        providers: [product_channels_service_1.ProductChannelsService],
        exports: [product_channels_service_1.ProductChannelsService],
    })
], ProductChannelsModule);
//# sourceMappingURL=product-channels.module.js.map