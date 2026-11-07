import { InviteUserConfirm } from "@/widgets/InviteUserConfirm/InviteUserConfirm";
import { PageProps } from "../next.type";
import { redirect } from "next/navigation";

export default async function InviteUserConfirm__({
  params,
  searchParams,
}: PageProps) {
  const { token, redirectUrl } = await searchParams;
  if (!token) redirect("/");

  return (
    <InviteUserConfirm
      token={token as string}
      redirectUrl={redirectUrl as string}
    />
  );
}
