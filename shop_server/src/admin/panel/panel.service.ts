import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreatePanelSupplyDto,
  GetPanelSaleStatisticsDto,
  PanelCreateDto,
  PanelProducts,
} from './dto';
import {
  eachDayOfInterval,
  eachMonthOfInterval,
  eachWeekOfInterval,
  endOfWeek,
  endOfMonth,
  endOfDay,
  formatDate,
} from 'date-fns';
import { moscowDateString, moscowDayEnd, moscowDayStart } from 'src/utils';
import { PanelSaleStatisticItem } from 'src/types';

@Injectable()
export class PanelService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: PanelCreateDto) {
    const newPanel = await this.prisma.panel.create({
      data,
    });

    return newPanel;
  }

  async list() {
    return await this.prisma.panel.findMany();
  }

  async panelProducts({ panelId }: PanelProducts) {
    return await this.prisma.product.findMany({
      where: { panelId },
    });
  }

  async createSupply(items: CreatePanelSupplyDto[], panelId: number) {
    const supply = await this.prisma.panelSupply.create({
      data: {
        panelId: panelId,
      },
    });

    if (!supply) throw new BadRequestException();

    await this.prisma.panelSupplyItem.createMany({
      data: items.map((item) => ({ supplyId: supply.id, ...item })),
    });

    return this.prisma.$transaction(
      items.map((item) =>
        this.prisma.product.update({
          where: { panelId, id: item.productId },
          data: { count: { increment: item.count } },
        }),
      ),
    );
  }

  async panelSaleStatistics(
    panelId: number,
    { dateStart, dateEnd, splitType }: GetPanelSaleStatisticsDto,
  ): Promise<PanelSaleStatisticItem[]> {
    const items: PanelSaleStatisticItem[] = [];
    let range = null;

    const rangeSales = await this.prisma.sale.findMany({
      where: {
        panelId,
        createdAt: {
          gte: moscowDayStart(dateStart),
          lt: moscowDayEnd(dateEnd),
        },
      },
    });

    switch (splitType) {
      case 'day':
        range = eachDayOfInterval({
          start: moscowDayStart(dateStart),
          end: moscowDayEnd(dateEnd),
        });
        break;
      case 'week':
        range = eachWeekOfInterval(
          {
            start: moscowDayStart(dateStart),
            end: moscowDayEnd(dateEnd),
          },
          { weekStartsOn: 1 },
        );
        break;
      case 'month':
        range = eachMonthOfInterval({
          start: moscowDayStart(dateStart),
          end: moscowDayEnd(dateEnd),
        });
        break;
    }

    for (let rangeItem of range) {
      const rangeItemDateStart = moscowDayStart(rangeItem);
      const rangeItemDateEnd = moscowDayEnd(
        splitType === 'day'
          ? endOfDay(rangeItem)
          : splitType === 'week'
            ? endOfWeek(rangeItem, { weekStartsOn: 1 })
            : endOfMonth(rangeItem),
      );
      const item = rangeSales.filter(
        (sale) =>
          sale.createdAt >= rangeItemDateStart &&
          sale.createdAt <= rangeItemDateEnd,
      );
      items.push({
        total: item.reduce((acc, item) => acc + Number(item.total), 0),
        date: {
          start: formatDate(rangeItemDateStart, 'dd-MM-yyyy'),
          end: formatDate(rangeItemDateEnd, 'dd-MM-yyyy'),
        },
      });
    }

    return items;
  }
}
