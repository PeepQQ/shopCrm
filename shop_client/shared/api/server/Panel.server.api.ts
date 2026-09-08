import { cookies } from "next/headers";
import { Panel } from "@/entities/panel";
import { Product } from "@/entities/product";
import { Sale } from "@/entities/sale";

const ApiUrl = process.env.API_URL;

export const getPanelsListServer = async (): Promise<Panel[]> => {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token");
  const response = await fetch(`${ApiUrl}/admin/panel/list`, {
    cache: "no-store",
    headers: {
      Cookie: `${token?.name}=${token?.value}`,
    },
  });
  return await response.json();
};

export const getPanelProductsServer = async (
  panelId: string,
): Promise<Product[]> => {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token");
  const response = await fetch(
    `${ApiUrl}/admin/panel/${panelId}/panelProducts`,
    {
      cache: "no-store",
      headers: {
        Cookie: `${token?.name}=${token?.value}`,
      },
    },
  );
  return await response.json();
};

export const getPanelGroupProductsServer = async (
  groupId: string,
): Promise<Product[]> => {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token");
  const response = await fetch(
    `${ApiUrl}/admin/panel/group/${groupId}/products`,
    {
      cache: "no-store",
      headers: {
        Cookie: `${token?.name}=${token?.value}`,
      },
    },
  );
  return await response.json();
};

export const getPanelSalesListServer = async (
  panelId: number | string,
): Promise<Sale[]> => {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token");
  const response = await fetch(`${ApiUrl}/admin/sale/list/${panelId}`, {
    cache: "no-store",
    headers: {
      Cookie: `${token?.name}=${token?.value}`,
    },
  });
  return await response.json();
};
