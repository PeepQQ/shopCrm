import { links } from "@/shared/config/links";

interface GetGroupItemLinkUrl {
  currentPage: string;
  panelId: number | string;
  groupId: number | string;
}

export const getGroupItemLinkUrl = ({
  currentPage,
  panelId,
  groupId,
}: GetGroupItemLinkUrl) => {
  const baseURL = links.admin.panel(panelId).groups.group(groupId);
  switch (currentPage) {
    case "sale":
      return baseURL.sale;
      break;
    case "supply":
      return baseURL.supply;
      break;
  }

  return links.admin.panel(panelId).groups.group(groupId).sale;
};
