import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePanelSupplyDto, PanelCreateDto, PanelProducts } from './dto';

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

    return await this.prisma.panelSupplyItem.createMany({
      data: items.map((item) => ({ supplyId: supply.id, ...item })),
    });
  }
}
