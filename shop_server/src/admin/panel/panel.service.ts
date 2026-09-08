import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import type { PanelCreateData, PanelProducts } from './dto';

@Injectable()
export class PanelService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: PanelCreateData) {
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
}
