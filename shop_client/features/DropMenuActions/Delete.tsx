import { TrashIcon } from "@/assets/icons";
import styles from "./DropMenuActions.module.scss";
import { ConfirmModal } from "@/shared/components/ConfirmModal";

interface DeleteProps {
  onConfirm: () => void;
  onReject?: () => void;
  text?: string;
}

export const Delete = ({ onConfirm, onReject, text }: DeleteProps) => {
  return (
    <ConfirmModal onConfirm={onConfirm} onReject={onReject} text={text}>
      <button className={styles.action}>
        <TrashIcon width={12} />
        Удалить
      </button>
    </ConfirmModal>
  );
};
