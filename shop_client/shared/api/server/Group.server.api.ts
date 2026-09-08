import { cookies } from "next/headers";
import { Group } from "@/entities/group";

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
