"use client";

import { useState } from "react";
import type { Group } from "@/entities/group";
import styles from "./GroupItem.module.scss";
import { useParams, useRouter, usePathname } from "next/navigation";
import { ArrowLeftIcon, FolderIcon, FolderOpenIcon } from "@/assets/icons";
import clsx from "clsx";
import { GroupItemActions } from "./GroupItemActions";
import { GroupType } from "@/entities/group/Group";
import { getGroupItemLinkUrl } from "./config";

interface GroupItemProps {
  group: Group;
  level: number;
  isInitialOpened?: boolean;
  showEditActions?: boolean;
  isLink?: boolean;
  showChildrens?: boolean;
}

export const GroupItem = ({
  group,
  level,
  isInitialOpened,
  showEditActions = false,
  isLink = false,
  showChildrens = false,
}: GroupItemProps) => {
  const router = useRouter();
  const { panelId } = useParams<{ panelId: string }>();
  const [isOpen, setIsOpen] = useState(isInitialOpened);
  const isShowEditActions = showEditActions;
  const pathname = usePathname();
  const linkUrl = getGroupItemLinkUrl({
    currentPage: pathname.split("/")[pathname.split("/").length - 1],
    panelId: panelId,
    groupId: group.id,
  });

  const hasChildren = group.children?.length > 0;

  const clickAction = () => {
    if (isLink && group.type === GroupType.FOLDER) {
      router.push(linkUrl);
    } else {
      setIsOpen((prev) => !prev);
    }
  };

  return (
    <div
      className={styles.group}
      style={{ "--level": level } as React.CSSProperties}
    >
      <div className={styles.groupHeader}>
        <span className={styles.groupName} onClick={clickAction}>
          {group.name}
          {group.type === GroupType.PARENT ? (
            <FolderIcon width={14} height={14} />
          ) : (
            <FolderOpenIcon width={14} height={14} />
          )}
          {showChildrens && group.children.length >= 1 && (
            <ArrowLeftIcon
              className={clsx(styles.arrow, isOpen ? styles.open : "")}
              width={12}
              height={12}
            />
          )}
        </span>
        {isShowEditActions && <GroupItemActions group={group} />}
      </div>

      {isOpen && hasChildren && showChildrens && (
        <div className={styles.children}>
          {group.children.map((child) => (
            <GroupItem
              key={child.id}
              group={child}
              level={level + 1}
              showEditActions={showEditActions}
              isInitialOpened={isInitialOpened}
              isLink={isLink}
              showChildrens={showChildrens}
            />
          ))}
        </div>
      )}
    </div>
  );
};
