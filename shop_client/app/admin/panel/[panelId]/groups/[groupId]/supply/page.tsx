import { GroupTable } from "@/features/Admin/Groups/GroupTable";
import { AddSupply } from "@/features/Admin/Supply/AddSupply";
import { getGroupProductsServer } from "@/shared/api/server";
import { OperationPanelSupply } from "@/features/Admin/Operations/Supply/OperationPanelSupply";

interface Props {
  params: Promise<{
    panelId: string;
    groupId: string;
  }>;
}

export default async function GroupSupplyage({ params }: Props) {
  const { groupId } = await params;
  const products = await getGroupProductsServer(groupId);

  return (
    <div className={"tableContent"}>
      <GroupTable
        fields={["name", "count"]}
        products={products}
        actions={(product) => <AddSupply product={product} />}
      />
      <OperationPanelSupply />
    </div>
  );
}
