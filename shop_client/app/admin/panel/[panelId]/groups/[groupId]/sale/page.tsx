import { GroupTable } from "@/features/Admin/Groups/GroupTable";
import { OperationPanelSale } from "@/features/Admin/Operations";
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
  const products = await getGroupProductsServer(groupId);

  return (
    <>
      <GroupTable
        fields={["name", "count", "cost"]}
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
