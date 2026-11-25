import { cookies } from "next/headers";
import {
  Panel,
  PanelSaleStatisticItem,
  PanelStatisticsSplitType,
} from "@/entities/panel";
import { Product } from "@/entities/product";

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

interface GetPanelSaleStatisticsData {
  panelId: number | string;
  data: {
    dateStart: string;
    dateEnd: string;
    splitType: PanelStatisticsSplitType;
  };
}

export const getPanelSaleStatistics = async ({
  panelId,
  data,
}: GetPanelSaleStatisticsData): Promise<PanelSaleStatisticItem[]> => {
  const params =
    data &&
    new URLSearchParams(
      Object.entries(data).filter(([, v]) => v != null) as [string, string][],
    );
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token");
  const response = await fetch(
    `${ApiUrl}/admin/panel/${panelId}/statistics/sale?${params}`,
    {
      cache: "no-store",
      headers: {
        Cookie: `${token?.name}=${token?.value}`,
      },
    },
  );
  return await response.json();
};
