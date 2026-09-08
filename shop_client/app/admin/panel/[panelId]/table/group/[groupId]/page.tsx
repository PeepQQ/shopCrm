import { getPanelGroupProductsServer } from "@/shared/api/server";
import { PanelTable } from "@/widgets/Admin/Panel";
import type { PageProps } from "@/app/next.type";
import { SaleCart } from "@/features/Admin/Sale";
import styles from "./page.module.scss";

export default async function PanelTableGroupPage({ params }: PageProps) {
  const { groupId } = await params;
  const products = await getPanelGroupProductsServer(groupId);

  return (
    <div className={styles.page}>
      <PanelTable products={products.filter((product) => product.count)} />
      <SaleCart />
    </div>
  );
}
