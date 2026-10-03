"use client";
import { Group } from "@/entities/group";
import styles from "./PanelSettingGroups.module.scss";
import { GroupItem } from "@/features/Admin/GroupItem";
import { GroupFormModal } from "@/features/Admin/GroupFormModal";
import { Button } from "@/shared/components/Button";
import { GroupType } from "@/entities/group/Group";
import { NodeRendererProps, Tree } from "react-arborist";
import { changeParent } from "@/shared/api/client";
import { useRouter } from "next/navigation";

interface PanelSettingGroupsProps {
  groups: Group[];
}

export const PanelSettingGroups = ({ groups }: PanelSettingGroupsProps) => {
  const router = useRouter();

  const handleMove = async ({
    dragIds,
    parentId,
    index,
  }: {
    dragIds: string[];
    parentId: string | null;
    index: number;
  }) => {
    const gragId = Number(dragIds[0]);
    try {
      await changeParent({
        groupId: gragId,
        parentId: Number(parentId) || null,
        index,
      });
      router.refresh();
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className={styles.panelSettingGroups}>
      <div className={styles.groupsList}>
        <Tree
          data={groups}
          onMove={handleMove}
          width="100%"
          height={600}
          rowHeight={32}
          indent={30}
          openByDefault={true}
          disableDrop={({ parentNode }) => {
            return parentNode?.data.type === "FOLDER";
          }}
          className={styles.treeWrapper}
        >
          {({ node, style, dragHandle }: NodeRendererProps<Group>) => {
            const group = node.data;

            return (
              <div
                style={{
                  ...style,
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <span ref={dragHandle} className={styles.dragButton}>
                  ⠿
                </span>
                <GroupItem
                  group={group}
                  level={node.level}
                  isInitialOpened={node.isOpen}
                  showEditActions
                />
              </div>
            );
          }}
        </Tree>
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
