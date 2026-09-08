import { PanelSettings } from "@/widgets/Admin/Panel";
import type { PageProps } from "@/app/next.type";

export default async function AdminPanelSettingsLayout({
  params,
  children,
}: PageProps & {
  children: React.ReactNode;
}) {
  const { panelId } = await params;

  return <PanelSettings panelId={panelId}>{children}</PanelSettings>;
}
