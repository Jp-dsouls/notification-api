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
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const uuid_1 = require("uuid");
const exceptions_1 = require("../common/exceptions");
let ProductsService = class ProductsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createProductDto) {
        const existing = await this.prisma.product.findUnique({
            where: { name: createProductDto.name },
        });
        if (existing) {
            throw new exceptions_1.ProductAlreadyExistsException(createProductDto.name);
        }
        return this.prisma.product.create({
            data: {
                name: createProductDto.name,
                apiKey: (0, uuid_1.v4)(),
                status: true,
            },
        });
    }
    async findAll(page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const [data, total] = await Promise.all([
            this.prisma.product.findMany({
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.product.count(),
        ]);
        return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
    }
    async findOne(id) {
        const product = await this.prisma.product.findUnique({
            where: { id },
            include: {
                productChannels: {
                    include: { channel: true },
                },
            },
        });
        if (!product) {
            throw new exceptions_1.ProductNotFoundException(id);
        }
        return product;
    }
    async findByApiKey(apiKey) {
        const product = await this.prisma.product.findUnique({
            where: { apiKey },
        });
        if (!product) {
            throw new exceptions_1.ProductNotFoundException(apiKey);
        }
        return product;
    }
    async updateStatus(id, updateProductStatusDto) {
        const product = await this.prisma.product.findUnique({ where: { id } });
        if (!product) {
            throw new exceptions_1.ProductNotFoundException(id);
        }
        return this.prisma.product.update({
            where: { id },
            data: { status: updateProductStatusDto.status },
        });
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductsService);
//# sourceMappingURL=products.service.js.map