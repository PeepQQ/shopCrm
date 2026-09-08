export const mapGroupTree = (groups: any[]): any[] => {
  return groups.map((group) => ({
    ...group,

    groupProducts: group.groupProducts.map(
      (groupProduct: any) => groupProduct.product,
    ),

    children: mapGroupTree(group?.children || []),
  }));
};
