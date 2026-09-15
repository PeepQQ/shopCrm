import { PanelSettings } from "@/widgets/Admin/Panel";

interface Props {
  children: React.ReactNode;
  params: Promise<{
    panelId: string;
  }>;
}

export default async function AdminPanelSettingsLayout({
  children,
  params,
}: Props) {
  const { panelId } = await params;

  return <PanelSettings panelId={panelId}>{children}</PanelSettings>;
}
