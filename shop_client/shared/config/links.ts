export const links = {
  login: "/login",
  admin: {
    root: "/admin",
    panel: (panelId: string | number) => ({
      root: `/admin/panel/${panelId}`,

      history: {
        sale: `/admin/panel/${panelId}/history/sale`,
      },

      groups: {
        root: `/admin/panel/${panelId}/groups`,
        group: (groupId: string | number) => ({
          sale: `/admin/panel/${panelId}/groups/${groupId}/sale`,
          supply: `/admin/panel/${panelId}/groups/${groupId}/supply`,
        }),
      },

      settings: {
        root: `/admin/panel/${panelId}/settings`,
        products: `/admin/panel/${panelId}/settings/products`,
        groups: `/admin/panel/${panelId}/settings/groups`,
      },
    }),
  },
};
