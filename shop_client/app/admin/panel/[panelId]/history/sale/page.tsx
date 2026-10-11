import type { PageProps } from "@/app/next.type";
import { getSalesHistoryServer } from "@/shared/api/server";
import { SalesHistory } from "@/widgets/Admin/Panel";

export default async function SalesHistoryPage({
  params,
  searchParams,
}: PageProps) {
  const query = await searchParams;
  const { panelId, groupId } = await params;
  const sales = await getSalesHistoryServer({ panelId, query });
  return <SalesHistory sales={sales} panelId={panelId} />;
}
