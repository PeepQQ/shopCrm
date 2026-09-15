"use client";
import { Group } from "@/entities/group";
import { Input } from "@/shared/components/Input";
import {
  Modal,
  ModalActions,
  ModalContent,
  ModalHeader,
} from "@/shared/components/Modal";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { createGroup } from "@/shared/api/client";
import { Button } from "@/shared/components/Button";
import { GroupType } from "@/entities/group/Group";

interface GroupModalProps {
  children: React.ReactNode;
  isEdit?: boolean;
  editData?: Group;
  parentId?: number;
  groupType: GroupType;
}

export const GroupFormModal = ({
  children,
  isEdit,
  editData,
  parentId,
  groupType,
}: GroupModalProps) => {
  const modalTitle = isEdit ? "Редактирование группы" : "Новая группа";
  const { panelId } = useParams();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [groupName, setGroupName] = useState(editData?.name || "");

  const closeOpenModal = () => setIsOpen((prev) => !prev);

  const handleCreate = async () => {
    if (!groupName.trim()) return;

    try {
      await createGroup({
        panelId: Number(panelId),
        name: groupName,
        parentId: parentId,
        type: groupType,
      });
      closeOpenModal();
      router.refresh();
    } catch (err) {
      alert(err);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} closeAction={closeOpenModal}>
        <ModalHeader>
          <h3>{modalTitle}</h3>
        </ModalHeader>
        <ModalContent>
          <Input
            label="Название"
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
        </ModalContent>
        <ModalActions>
          <Button fullWidth onClick={handleCreate}>
            Подтвердить
          </Button>
        </ModalActions>
      </Modal>

      <div onClick={closeOpenModal}>{children}</div>
    </>
  );
};
