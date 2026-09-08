import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  ConnectDisconnectProductDto,
  CreateGroupDto,
  GetGroupListDto,
  GetGroupProducts,
} from './dto';
import { mapGroupTree } from './config';

@Injectable()
export class GroupService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateGroupDto) {
    const panel = await this.prisma.panel.findUnique({
      where: { id: Number(data.panelId) },
    });

    if (!panel) throw new ForbiddenException();

    return await this.prisma.group.create({
      data: data,
    });
  }

  async list(data: GetGroupListDto) {
    const groups = await this.prisma.group.findMany({
      where: {
        panelId: data.panelId,
        parentId: null,
      },
      include: {
        children: {
          include: {
            groupProducts: {
              include: {
                product: true,
              },
            },
          },
        },

        groupProducts: {
          include: {
            product: true,
          },
        },
      },
    });

    return mapGroupTree(groups);
  }

  async groupProducts({ groupId }: GetGroupProducts) {
    const groupProducts = await this.prisma.groupProducts.findMany({
      where: {
        groupId,
      },
      include: {
        product: true,
      },
    });

    return groupProducts.map((item) => item.product);
  }

  async connectProduct(data: ConnectDisconnectProductDto) {
    return await this.prisma.groupProducts.create({
      data: data,
    });
  }

  async disconnectProduct(data: ConnectDisconnectProductDto) {
    return await this.prisma.groupProducts.delete({
      where: {
        groupId_productId: {
          groupId: data.groupId,
          productId: data.productId,
        },
      },
    });
  }
}
