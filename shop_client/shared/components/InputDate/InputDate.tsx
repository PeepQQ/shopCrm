import styles from "./InputDate.module.scss";
import { CalendarIcon } from "@/assets/icons";

export const InputDate = ({
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <div className={styles.inputDateWrapper}>
      <input type="date" className={styles.inputDate} {...props} />
      <div className={styles.inputDateIcon}>
        <CalendarIcon color="white" width={16} height={16} />
      </div>
    </div>
  );
};
