import { InviteUserForm } from "@/features/Admin/Settings/InviteUser";
import styles from './InviteUserContent.module.scss';

export const InviteUserContent = () => {
  return (
    <div className={styles.inviteUserContent}>
      <InviteUserForm />
    </div>
  );
};
