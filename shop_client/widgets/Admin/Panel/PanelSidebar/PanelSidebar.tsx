import { Group } from "@/entities/group";
import styles from "./PanelSidebar.module.scss";
import { GroupItem } from "@/features/Admin/GroupItem";

interface PanelSidebarProps {
  groups: Group[];
}

export const PanelSidebar = ({ groups }: PanelSidebarProps) => {
  return (
    <div className={styles.panelSidebar}>
      <div className={styles.groupsList}>
        {groups?.length >= 1 &&
          groups?.map((group) => (
            <GroupItem
              key={group.id}
              group={group}
              level={0}
              isLink
              showChildrens
            />
          ))}
      </div>
    </div>
  );
};
