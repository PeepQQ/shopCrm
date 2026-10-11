import { SettingProducts } from "@/widgets/Admin/Panel/PanelSettings/Products/SettingProducts";
import { getPanelProductsServer } from "@/shared/api/server/Panel.server.api";
import type { PageProps } from "@/app/next.type";

export default async function SettingProductsPage({ params }: PageProps) {
  const { panelId } = await params;
  const products = await getPanelProductsServer(panelId);
  return <SettingProducts products={products} />;
}
