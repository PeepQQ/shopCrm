import { Sale } from "@/entities/sale";
import { cookies } from "next/headers";

const ApiUrl = process.env.API_URL;

interface GetSalesHistoryServerData {
  panelId: number | string;
  query?: {
    date?: string;
    dateStart?: string;
    dateEnd?: string;
  };
}

export const getSalesHistoryServer = async ({
  panelId,
  query,
}: GetSalesHistoryServerData): Promise<Sale[]> => {
  const params =
    query &&
    new URLSearchParams(
      Object.entries(query).filter(([, v]) => v != null) as [string, string][],
    );
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token");
  const response = await fetch(
    `${ApiUrl}/admin/sale/${panelId}/history?${params}`,
    {
      cache: "no-store",
      headers: {
        Cookie: `${token?.name}=${token?.value}`,
      },
    },
  );
  return await response.json();
};
