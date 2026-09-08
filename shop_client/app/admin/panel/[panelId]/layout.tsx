import type { PageProps } from "@/app/next.type";
import { AdminHeader } from "@/widgets/Admin";
import { PanelHeader } from "@/widgets/Admin/Panel";

export default async function AdminRootLayout({
  params,
  children,
}: PageProps & {
  children: React.ReactNode;
}) {
  const { panelId } = await params;

  return (
    <>
      <PanelHeader />
      {children}
    </>
  );
}
