import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSaleDto, SaleItemDto, SalesListDto } from './dto';
import { Prisma } from 'src/generated/prisma/client';

@Injectable()
export class SaleService {
  constructor(private readonly prisma: PrismaService) {}

  async create({ panelId, saleItems }: CreateSaleDto) {
    const totalSalePrice = saleItems.reduce(
      (total, item) =>
        total.add(new Prisma.Decimal(item.price).mul(item.count)),
      new Prisma.Decimal(0),
    );

    const newSale = await this.prisma.sale.create({
      data: { panelId: panelId, total: totalSalePrice },
    });

    await Promise.all(
      saleItems.map((item) => this.createSaleItem(item, newSale.id)),
    );

    return { success: true };
  }

  async salesList({ panelId }: SalesListDto) {
    return await this.prisma.sale.findMany({
      where: { panelId },
      include: {
        saleItems: {
          include: {
            product: true,
          },
        },
      },
    });
  }

  async createSaleItem(data: SaleItemDto, saleId: number) {
    const product = await this.prisma.product.findUnique({
      where: { id: data.productId },
    });

    if (!product?.count || product.count === 0 || product?.count < data.count) {
      throw new BadRequestException('Отсутствует нужное количество товара');
    }

    return Promise.all([
      await this.prisma.saleItem.create({
        data: {
          ...data,
          saleId,
        },
      }),

      await this.prisma.product.update({
        where: { id: data.productId },
        data: {
          count: {
            decrement: data.count,
          },
        },
      }),
    ]);
  }
}
