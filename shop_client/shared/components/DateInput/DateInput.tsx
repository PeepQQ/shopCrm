import { DayPicker } from "react-day-picker";
import { ru } from "react-day-picker/locale";
import "react-day-picker/style.css";
import styles from "./DateInput.module.scss";
import { useState } from "react";
import clsx from "clsx";
import { format, isValid, parse } from "date-fns";
import { IMaskInput } from "react-imask";

interface DateInputProps {
  onSelect: (date: Date) => void;
  children: React.ReactNode;
}

export const DateInput = ({ children, onSelect }: DateInputProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [month, setMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [inputValue, setInputValue] = useState("");

  const handleDayPickerSelect = (date: Date | undefined) => {
    if (!date) {
      setInputValue("");
      setSelectedDate(new Date());
    } else {
      setSelectedDate(date);
      setMonth(date);
      setInputValue(format(date, "dd.MM.yyyy"));
    }
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);

    if (value.length === 10) {
      const parsedDate = parse(value, "dd.MM.yyyy", new Date());
      if (isValid(parsedDate)) {
        setSelectedDate(parsedDate);
        setMonth(parsedDate);
      } else {
        setSelectedDate(new Date());
      }
    } else {
      setSelectedDate(new Date());
    }
  };

  return (
    <div className={clsx(styles.dateInputWrapper, isOpen ? styles.open : "")}>
      <label htmlFor={"dateInput"}>Дата:</label>
      <IMaskInput
        mask="00.00.0000"
        value={inputValue}
        onAccept={handleInputChange}
      />
      <DayPicker
        mode="single"
        selected={selectedDate}
        weekStartsOn={1}
        month={month}
        onMonthChange={setMonth}
        onSelect={(date) => {
          handleDayPickerSelect(date);
          onSelect(date);
          setIsOpen(false);
        }}
        required
        classNames={{
          root: styles.root,
          day: styles.day,
          day_button: styles.dayButton,
          selected: styles.selected,
          today: styles.today,
          weekday: styles.weekday,
          button_previous: styles.previous,
          button_next: styles.next,
        }}
        locale={ru}
      />
      <div onClick={() => setIsOpen((prev) => !prev)}>{children}</div>
    </div>
  );
};
