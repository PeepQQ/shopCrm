import { Group } from "@/entities/group";
import styles from "./GroupsTree.module.scss";
import { GroupItem } from "@/features/Admin/GroupItem";

interface GroupsTreeProps {
  groups: Group[];
}

export const GroupsTree = ({ groups }: GroupsTreeProps) => {
  return (
    <div className={styles.groupsTree}>
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
