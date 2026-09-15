import { PanelHeader } from "@/widgets/Admin/Panel";

export default async function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PanelHeader />
      {children}
    </>
  );
}
