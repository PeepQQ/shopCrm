import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSaleDto, SaleItemDto, SalesHistoryDto } from './dto';
import { Prisma, Sale } from 'src/generated/prisma/client';
import { moscowDayEnd, moscowDayStart, moscowTodayRange } from 'src/utils';
import { SaleFindManyArgs, SaleInclude } from 'src/generated/prisma/models';

@Injectable()
export class SaleService {
  constructor(private readonly prisma: PrismaService) {}

  async create({ panelId, saleItems }: CreateSaleDto, userId: number) {
    const totalSalePrice = saleItems.reduce(
      (total, item) =>
        total.add(new Prisma.Decimal(item.price).mul(item.count)),
      new Prisma.Decimal(0),
    );

    const newSale = await this.prisma.sale.create({
      data: { panelId: panelId, total: totalSalePrice, userId },
    });

    await Promise.all(
      saleItems.map((item) => this.createSaleItem(item, newSale.id)),
    );

    return { success: true };
  }

  async salesHistory(
    panelId: number,
    { date, dateEnd, dateStart }: SalesHistoryDto,
  ) {
    const where: Prisma.SaleWhereInput = { panelId };

    if (date) {
      where.createdAt = {
        gte: moscowDayStart(date),
        lt: moscowDayEnd(date),
      };
    } else if (dateStart && dateEnd) {
      where.createdAt = {
        ...(dateStart && { gte: moscowDayStart(dateStart) }),
        ...(dateEnd && { lt: moscowDayEnd(dateEnd) }),
      };
    } else {
      where.createdAt = moscowTodayRange();
    }

    return this.prisma.sale.findMany({
      where,
      include: {
        user: true,
        saleItems: {
          include: { product: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getSalesByDateRange({
    panelId,
    dateStart,
    dateEnd,
    prismaArgs,
  }: {
    panelId: number;
    dateStart: Date;
    dateEnd: Date;
    prismaArgs?: SaleFindManyArgs;
  }): Promise<Sale[] | []> {
    const sales = await this.prisma.sale.findMany({
      where: {
        panelId,
        createdAt: {
          gte: dateStart,
          lt: dateEnd,
        },
      },
      ...prismaArgs,
    });

    return sales;
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
