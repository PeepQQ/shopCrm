import type { Group } from 'src/generated/prisma/client';

export function mapGroupTree(groups: Group[]) {
  const groupMap: any[] = [];

  for (const group of groups) {
    groupMap.push({
      ...group,
      children: [],
    });
  }

  const roots: any[] = [];

  for (const group of groups) {
    const current = groupMap.find((i) => i.id === group.id);

    if (group.parentId === null) {
      roots.splice(current.index, 0, current);
      continue;
    }

    const parent = groupMap.find((i) => i.id === group.parentId);

    if (parent) {
      parent.children.splice(current.index, 0, current);
    }
  }

  return roots;
}
