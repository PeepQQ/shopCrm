import { AdminLayout } from "@/widgets/Admin";
import { getPanelsListServer } from "@/shared/api/server";

export default async function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const panels = await getPanelsListServer();
  return <AdminLayout panels={panels}>{children}</AdminLayout>;
}
