import { links } from "@/shared/config/links";

export const panelHeaderLinks = [
  {
    href: (panelId: string) => links.admin.panel(panelId).settings.products,
    text: "Настройки",
  },
  {
    href: (panelId: string) => links.admin.panel(panelId).groups.root,
    text: "Продажа",
  },
  {
    href: (panelId: string) => links.admin.panel(panelId).history.sale,
    text: "Истори",
  },
  {
    href: (panelId: string) =>
      links.admin.panel(panelId).groups.group(0).supply,
    text: "Поступление",
  },
];
