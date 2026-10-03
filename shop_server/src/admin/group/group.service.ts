import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  ChangeParentDto,
  ConnectDisconnectProductDto,
  CreateGroupDto,
  DeleteGroupDto,
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

    const newGroupIndex = await this.getActualndex(data.parentId);

    await this.prisma.group.create({
      data: { ...data, parentId: data?.parentId || null, index: newGroupIndex },
    });
  }

  async delete(data: DeleteGroupDto) {
    const group = await this.prisma.group.findUnique({
      where: {
        id: data.groupId,
      },
    });

    if (!group)
      throw new ForbiddenException('Группа с переданным id не найдена');

    const groupsId = [
      data.groupId,
      ...(await this.getAllChildrensId(data.groupId)),
    ];

    return Promise.all([
      this.prisma.groupProducts.deleteMany({
        where: {
          groupId: {
            in: groupsId,
          },
        },
      }),
      this.prisma.group.deleteMany({
        where: {
          id: {
            in: groupsId,
          },
        },
      }),
    ]);
  }

  async getAllChildrensId(groupId: number): Promise<number[]> {
    const children = await this.prisma.group.findMany({
      where: {
        parentId: groupId,
      },
      select: {
        id: true,
      },
    });

    const result: number[] = [];

    for (const child of children) {
      result.push(child.id);

      const descendants = await this.getAllChildrensId(child.id);

      result.push(...descendants);
    }

    return result;
  }

  async list(data: GetGroupListDto) {
    const groups = await this.prisma.group.findMany({
      where: {
        panelId: data.panelId,
      },
      include: {
        groupProducts: {
          include: {
            product: true,
          },
        },
      },
    });

    const groupTree = mapGroupTree(groups);

    return groupTree;
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

  async changeParent(data: ChangeParentDto) {
    if (data.groupId === data.parentId) {
      throw new BadRequestException('');
    }

    await this.prisma.group.update({
      where: {
        id: data.groupId,
      },
      data: {
        parentId: data.parentId,
        index: data.index,
      },
    });
  }

  private async getActualndex(parentId?: number | null | undefined) {
    if (parentId) {
      const parentGroups = await this.prisma.group.findMany({
        where: { parentId },
      });

      return parentGroups.length;
    } else {
      const firstLevelGroups = await this.prisma.group.findMany({
        where: { parentId: null },
      });

      return firstLevelGroups.length;
    }
  }
}
