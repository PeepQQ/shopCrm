import { cookies } from "next/headers";
import { Group } from "@/entities/group";
import { Product } from "@/entities/product";

const ApiUrl = process.env.API_URL;

export const getPanelGroupsServer = async (
  panelId: string,
): Promise<Group[]> => {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token");
  const response = await fetch(`${ApiUrl}/admin/group/${panelId}`, {
    cache: "no-store",
    headers: {
      Cookie: `${token?.name}=${token?.value}`,
    },
  });
  return await response.json();
};

export const getGroupProductsServer = async (
  groupId: string,
): Promise<Product[]> => {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token");
  const response = await fetch(`${ApiUrl}/admin/group/${groupId}/products`, {
    cache: "no-store",
    headers: {
      Cookie: `${token?.name}=${token?.value}`,
    },
  });
  return await response.json();
};
