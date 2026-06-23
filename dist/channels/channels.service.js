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
exports.ChannelsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const exceptions_1 = require("../common/exceptions");
let ChannelsService = class ChannelsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createChannelDto) {
        const existing = await this.prisma.channel.findUnique({
            where: { name: createChannelDto.name },
        });
        if (existing) {
            throw new exceptions_1.ChannelAlreadyExistsException(createChannelDto.name);
        }
        return this.prisma.channel.create({
            data: {
                name: createChannelDto.name,
                configSchema: createChannelDto.configSchema,
            },
        });
    }
    async findAll() {
        return this.prisma.channel.findMany({
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOne(id) {
        const channel = await this.prisma.channel.findUnique({
            where: { id },
        });
        if (!channel) {
            throw new exceptions_1.ChannelNotFoundException(id);
        }
        return channel;
    }
    async update(id, updateChannelDto) {
        const channel = await this.prisma.channel.findUnique({ where: { id } });
        if (!channel) {
            throw new exceptions_1.ChannelNotFoundException(id);
        }
        return this.prisma.channel.update({
            where: { id },
            data: { configSchema: updateChannelDto.configSchema },
        });
    }
};
exports.ChannelsService = ChannelsService;
exports.ChannelsService = ChannelsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ChannelsService);
//# sourceMappingURL=channels.service.js.map