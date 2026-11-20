import { GroupTable } from "@/features/Admin/Groups/GroupTable";
import { OperationPanelSale } from "@/features/Admin/Sale/OperationPanelSale";
import { AddToSaleModal } from "@/features/Admin/Sale/AddToSaleModal";
import { getGroupProductsServer } from "@/shared/api/server";

interface Props {
  params: Promise<{
    panelId: string;
    groupId: string;
  }>;
}

export default async function GroupSalePage({ params }: Props) {
  const { groupId } = await params;
  const products = (await getGroupProductsServer(groupId)).filter(
    (product) => product.count,
  );

  return (
    <>
      <GroupTable
        fields={[{ key: "name" }, { key: "count" }, { key: "cost" }]}
        products={products}
        actions={(product) => (
          <AddToSaleModal product={product}>
            <span>Добавить</span>
          </AddToSaleModal>
        )}
      />
      <OperationPanelSale />
    </>
  );
}
