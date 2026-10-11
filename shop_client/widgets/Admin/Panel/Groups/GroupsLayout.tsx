import { GroupsTree } from "@/shared/components/GroupsTree";
import styles from "./GroupsLayout.module.scss";
import { Group } from "@/entities/group";

interface GroupsLayoutProps {
  groups: Group[];
  children: React.ReactNode;
}

export const GroupsLayout = ({ groups, children }: GroupsLayoutProps) => {
  return (
    <div className={styles.groupsLayout}>
      <div className={styles.content}>{children}</div>
      <div className={styles.groupsTree}>
        <GroupsTree groups={groups} />
      </div>
    </div>
  );
};
