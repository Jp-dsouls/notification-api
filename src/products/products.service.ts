import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductStatusDto } from './dto/update-product-status.dto';
import { v4 as uuidv4 } from 'uuid';
import {
  ProductAlreadyExistsException,
  ProductNotFoundException,
} from '../common/exceptions';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    const existing = await this.prisma.product.findUnique({
      where: { name: createProductDto.name },
    });

    if (existing) {
      throw new ProductAlreadyExistsException(createProductDto.name);
    }

    return this.prisma.product.create({
      data: {
        name: createProductDto.name,
        apiKey: uuidv4(),
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

  async findOne(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: {
        productChannels: {
          include: { channel: true },
        },
      },
    });

    if (!product) {
      throw new ProductNotFoundException(id);
    }

    return product;
  }

  async findByApiKey(apiKey: string) {
    const product = await this.prisma.product.findUnique({
      where: { apiKey },
    });

    if (!product) {
      throw new ProductNotFoundException(apiKey);
    }

    return product;
  }

  async updateStatus(id: string, updateProductStatusDto: UpdateProductStatusDto) {
    const product = await this.prisma.product.findUnique({ where: { id } });

    if (!product) {
      throw new ProductNotFoundException(id);
    }

    return this.prisma.product.update({
      where: { id },
      data: { status: updateProductStatusDto.status },
    });
  }
}
