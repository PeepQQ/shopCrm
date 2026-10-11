import { getPanelGroupsServer } from "@/shared/api/server";
import { GroupsLayout } from "@/widgets/Admin/Panel/Groups";

interface Props {
  children: React.ReactNode;
  params: Promise<{
    panelId: string;
  }>;
}

export default async function GroupsPagesLayout({ children, params }: Props) {
  const { panelId } = await params;
  const groups = await getPanelGroupsServer(panelId);

  return <GroupsLayout groups={groups}>{children}</GroupsLayout>;
}
