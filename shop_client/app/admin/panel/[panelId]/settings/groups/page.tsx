import type { PageProps } from "@/app/next.type";
import { getPanelGroupsServer } from "@/shared/api/server";
import { SettingGroups } from "@/widgets/Admin/Panel/PanelSettings";

export default async function SettingGroupsPage({ params }: PageProps) {
  const { panelId } = await params;
  const groups = await getPanelGroupsServer(panelId);
  return <SettingGroups groups={groups} />;
}
