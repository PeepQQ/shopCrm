import type { PageProps } from "@/app/next.type";
import { getPanelGroupsServer } from "@/shared/api/server";
import { PanelSettingGroups } from "@/widgets/Admin/Panel/PanelSettings";

export default async function PanelSettingGroupsPage({ params }: PageProps) {
  const { panelId } = await params;
  const groups = await getPanelGroupsServer(panelId);
  console.log(groups);
  return <PanelSettingGroups groups={groups} />;
}
