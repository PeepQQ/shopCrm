import type { Group } from 'src/generated/prisma/client';

export function mapGroupTree(groups: Group[]) {
  const groupMap = new Map<number, any>();

  for (const group of groups) {
    groupMap.set(group.id, {
      ...group,
      children: [],
    });
  }

  const roots: any[] = [];

  for (const group of groups) {
    const current = groupMap.get(group.id);

    if (group.parentId === null) {
      roots.push(current);
      continue;
    }

    const parent = groupMap.get(group.parentId);

    if (parent) {
      parent.children.push(current);
    }
  }

  return roots;
}
