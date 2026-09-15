import { Group } from "@/entities/group";
import styles from "./PanelSettingGroups.module.scss";
import { GroupItem } from "@/shared/components/Group";
import { GroupFormModal } from "@/features/Admin/GroupFormModal";
import { Button } from "@/shared/components/Button";
import { GroupType } from "@/entities/group/Group";

interface PanelSettingGroupsProps {
  groups: Group[];
}

export const PanelSettingGroups = ({ groups }: PanelSettingGroupsProps) => {
  return (
    <div className={styles.panelSettingGroups}>
      <div className={styles.groupsList}>
        {groups?.length >= 1 &&
          groups?.map((group) => (
            <GroupItem
              key={group.id}
              group={group}
              level={0}
              isInitialOpened
              showEditActions
            />
          ))}
        <div className={styles.createActions}>
          <GroupFormModal groupType={GroupType.PARENT}>
            <Button className={styles.createNewParent} size="sm">
              Создать категорию
            </Button>
          </GroupFormModal>
          <GroupFormModal groupType={GroupType.FOLDER}>
            <Button className={styles.createNewParent} size="sm">
              Создать хранилище
            </Button>
          </GroupFormModal>
        </div>
      </div>
    </div>
  );
};
