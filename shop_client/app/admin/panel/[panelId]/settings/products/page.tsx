import { PanelSettingsProducts } from "@/widgets/Admin/Panel/PanelSettings/Products/PanelSettingsProducts";
import { getPanelProductsServer } from "@/shared/api/server/Panel.server.api";
import type { PageProps } from "@/app/next.type";

export default async function PanelSettingsProductsPage({ params }: PageProps) {
  const { panelId } = await params;
  const products = await getPanelProductsServer(panelId);
  return <PanelSettingsProducts products={products} />;
}
