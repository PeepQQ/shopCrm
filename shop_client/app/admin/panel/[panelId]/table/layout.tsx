import { PanelLayout } from "@/widgets/Admin/Panel";
import { getPanelGroupsServer } from "@/shared/api/server";

interface Props {
  children: React.ReactNode;
  params: Promise<{
    panelId: string;
  }>;
}

export default async function PanelTableLayout({ children, params }: Props) {
  const { panelId } = await params;
  const groups = await getPanelGroupsServer(panelId);

  console.log(groups);

  return <PanelLayout groups={groups}>{children}</PanelLayout>;
}
