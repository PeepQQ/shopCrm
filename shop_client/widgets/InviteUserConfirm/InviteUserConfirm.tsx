import { InviteUserConfirmForm } from "@/features/InviteUserConfirm";
import styles from "./InviteUserConfirm.module.scss";

export const InviteUserConfirm = ({ token, redirectUrl }: { token: string, redirectUrl?: string }) => {
  return <div className={styles.inviteUserConfirm}>
    <InviteUserConfirmForm token={token} redirectUrl={redirectUrl}/>
  </div>;
};
