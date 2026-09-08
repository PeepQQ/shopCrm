import { AdminLayout } from "@/layouts/Admin";
import type { PageProps } from "../next.type";
import { getPanelsListServer } from "@/shared/api/server";

export default async function AdminRootLayout({
  children,
}: PageProps & {
  children: React.ReactNode;
}) {
  const panels = await getPanelsListServer();
  return <AdminLayout panels={panels}>{children}</AdminLayout>;
}
