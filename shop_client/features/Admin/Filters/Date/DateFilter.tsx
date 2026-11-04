"use client";
import styles from "./DateFilter.module.scss";
import { useState } from "react";
import { Button } from "@/shared/components/Button";
import { formatDate } from "@/shared/utils";
import { redirect } from "next/navigation";
import { InputDate } from "@/shared/components/InputDate";

interface DateFilterProps {
  redirectBaseUrl: string;
}

export const DateFilter = ({ redirectBaseUrl }: DateFilterProps) => {
  const [date, setDate] = useState<Date | null>(null);

  const handleSubmit = () => {
    if (!date) return;
    const params = new URLSearchParams();
    params.set("date", formatDate(date));
    redirect(`${redirectBaseUrl}?${params}`);
  };

  const handleReset = () => {
    setDate(null);
    redirect(redirectBaseUrl);
  };

  return (
    <div className={styles.dateFilter}>
      <div className={styles.dateFilterField}>
        <span>Дата</span>
        <InputDate onChange={(val) => setDate(val)} value={date} />
      </div>
      <Button onClick={handleSubmit} size="sm">
        Применить
      </Button>
      <Button
        onClick={handleReset}
        size="sm"
        className={styles.dateFilterReset}
      >
        Отменить
      </Button>
    </div>
  );
};
