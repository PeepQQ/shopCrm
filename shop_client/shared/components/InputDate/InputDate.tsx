import styles from "./InputDate.module.scss";
import { CalendarIcon } from "@/assets/icons";
import { formatDate } from "@/shared/utils";

type InputDateProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "value" | "onChange"
> & {
  value: Date | null;
  onChange?: (date: Date | null) => void;
};

export const InputDate = ({ value, onChange, ...props }: InputDateProps) => {
  return (
    <div className={styles.inputDateWrapper}>
      <input
        type="date"
        value={value ? formatDate(value) : ""}
        onChange={(e) => {
          const val = e.target.value;
          onChange?.(val ? new Date(val) : null);
        }}
        className={styles.inputDate}
        {...props}
      />
      <div className={styles.inputDateIcon}>
        <CalendarIcon color="white" width={16} height={16} />
      </div>
    </div>
  );
};
