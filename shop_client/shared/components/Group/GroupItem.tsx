"use client";

import { useState } from "react";
import type { Group } from "@/entities/group";
import styles from "./GroupItem.module.scss";
import { GroupProductsModal } from "@/features/Admin/GroupProductsModal";
import { links } from "@/shared/config/links";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "@/assets/icons";
import clsx from "clsx";

interface GroupItemProps {
  group: Group;
  level: number;
  isInitialOpened?: boolean;
  showEditActions?: boolean;
  isLink?: boolean;
}

export const GroupItem = ({
  group,
  level,
  isInitialOpened,
  showEditActions = false,
  isLink = false,
}: GroupItemProps) => {
  const router = useRouter();
  const { panelId } = useParams<{ panelId: string }>();
  const [isOpen, setIsOpen] = useState(isInitialOpened);
  const isShowEditActions = showEditActions && group.children.length === 0;
  const panelTableUrl = links.admin.panel(panelId).table.group(group.id);

  const hasChildren = group.children?.length > 0;

  const clickAction = () => {
    if (isLink && group.groupProducts.length > 0) {
      router.push(panelTableUrl);
    } else {
      setIsOpen((prev) => !prev);
    }
  };

  return (
    <div
      className={clsx(styles.group, isOpen ? styles.open : "")}
      style={{ "--level": level } as React.CSSProperties}
    >
      <div className={styles.groupHeader}>
        <span className={styles.groupName} onClick={clickAction}>
          {group.name}
          {group.children.length > 1 && (
            <ArrowLeftIcon className={styles.arrow} width={12} height={12} />
          )}
        </span>
        {isShowEditActions && (
          <div className={styles.groupActions}>
            <GroupProductsModal group={group}>
              <button className={styles.groupAction}>Товары</button>
            </GroupProductsModal>
          </div>
        )}
      </div>

      {isOpen && hasChildren && (
        <div className={styles.children}>
          {group.children.map((child) => (
            <GroupItem
              key={child.id}
              group={child}
              level={level + 1}
              showEditActions={showEditActions}
              isInitialOpened={isInitialOpened}
              isLink={isLink}
            />
          ))}
        </div>
      )}
    </div>
  );
};
