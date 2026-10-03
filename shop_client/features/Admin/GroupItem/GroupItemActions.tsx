"use client";
import { DropMenu } from "@/shared/components/DropMenu";
import { GroupFormModal } from "../GroupFormModal";
import { GroupProductsModal } from "../GroupProductsModal";
import styles from "./GroupItem.module.scss";
import { Delete } from "@/features/DropMenuActions";
import { Group } from "@/entities/group";
import { GroupType } from "@/entities/group/Group";
import { deleteGroup } from "@/shared/api/client";
import { useRouter } from "next/navigation";
import { getApiError } from "@/shared/config";

interface GroupItemActionsProps {
  group: Group;
}

const collectChildrenNames = (childrens: Group["children"]): string[] => {
  const names = [];
  for (const child of childrens) {
    names.push(child.name);

    if (child?.children.length >= 1) {
      const other: string[] = collectChildrenNames(child.children);

      names.push(...other);
    }
  }

  return names;
};

export const GroupItemActions = ({ group }: GroupItemActionsProps) => {
  const router = useRouter();
  const deleteGroupHandle = async () => {
    try {
      await deleteGroup(group.id);
      router.refresh();
    } catch (err) {
      alert(getApiError(err)?.message);
    }
  };

  return (
    <div className={styles.groupActions}>
      {group.type === GroupType.PARENT && (
        <>
          <GroupFormModal parentId={group.id} groupType={GroupType.PARENT}>
            <button className={styles.groupAction}>+ категория</button>
          </GroupFormModal>
          <GroupFormModal parentId={group.id} groupType={GroupType.FOLDER}>
            <button className={styles.groupAction}>+ хранилище</button>
          </GroupFormModal>
        </>
      )}
      {group.type === GroupType.FOLDER && (
        <GroupProductsModal group={group}>
          <button className={styles.groupAction}>Товары</button>
        </GroupProductsModal>
      )}
      <DropMenu>
        <Delete
          onConfirm={deleteGroupHandle}
          text={
            group.children.length > 0
              ? `После удаления группы будут удалены и все дочерние: ${collectChildrenNames(group.children).join(" ")}`
              : ""
          }
        />
      </DropMenu>
    </div>
  );
};
