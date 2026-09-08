import type { PageProps } from "@/app/next.type";
import { PanelLayout } from "@/layouts/Admin/Panel";
import { getPanelGroupsServer } from "@/shared/api/server";

export default async function PanelTableLayout({
  params,
  children,
}: PageProps & {
  children: React.ReactNode;
}) {
  const { panelId } = await params;
  const groups = await getPanelGroupsServer(panelId);

  return <PanelLayout groups={groups}>{children}</PanelLayout>;
}
