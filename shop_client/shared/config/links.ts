export const links = {
  login: "/login",
  admin: {
    root: "/admin",
    panel: (panelId: string | number) => ({
      root: `/admin/panel/${panelId}`,
      salesList: `/admin/panel/${panelId}/salesList`,

      table: {
        root: `/admin/panel/${panelId}/table`,
        group: (groupId: string | number) =>
          `/admin/panel/${panelId}/table/group/${groupId}`,
      },

      settings: {
        root: `/admin/panel/${panelId}/settings`,
        products: `/admin/panel/${panelId}/settings/products`,
        groups: `/admin/panel/${panelId}/settings/groups`,
      },
    }),
  },
};
