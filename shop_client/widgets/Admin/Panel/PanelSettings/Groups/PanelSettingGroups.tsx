import { Group } from "@/entities/group";
import styles from "./PanelSettingGroups.module.scss";
import { GroupItem } from "@/shared/components/Group";

interface PanelSettingGroupsProps {
  groups: Group[];
}

export const PanelSettingGroups = ({ groups }: PanelSettingGroupsProps) => {
  return (
    <div className={styles.panelSettingGroups}>
      <div className={styles.groupsList}>
        {groups.map((group) => (
          <GroupItem
            key={group.id}
            group={group}
            level={0}
            isInitialOpened
            showEditActions
          />
        ))}
      </div>
    </div>
  );
};
