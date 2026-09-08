import type { PageProps } from "@/app/next.type";
import { getPanelSalesListServer } from "@/shared/api/server";
import { PanelSalesList } from "@/widgets/Admin/Panel";

export default async function PanelSalesListPage({ params }: PageProps) {
  const { panelId } = await params;
  const sales = await getPanelSalesListServer(panelId);
  return <PanelSalesList sales={sales} />;
}
