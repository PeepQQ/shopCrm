import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto, UpdateProductDto } from './dto';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateProductDto) {
    return await this.prisma.product.create({
      data: data,
    });
  }

  async update({ productId, ...newData }: UpdateProductDto) {
    return await this.prisma.product.update({
      where: { id: productId },
      data: newData,
    });
  }

  async list() {
    return await this.prisma.product.findMany();
  }
}
