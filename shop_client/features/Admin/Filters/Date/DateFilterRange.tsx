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

export const DateFilterRange = ({ redirectBaseUrl }: DateFilterProps) => {
  const [dateStart, setDateStart] = useState<Date | null>(null);
  const [dateEnd, setDateEnd] = useState<Date | null>(null);

  const handleSubmit = () => {
    if (!dateStart || !dateEnd) return;
    const params = new URLSearchParams();
    params.set("dateStart", formatDate(dateStart));
    params.set("dateEnd", formatDate(dateEnd));
    redirect(`${redirectBaseUrl}?${params}`);
  };

  const handleReset = () => {
    setDateStart(new Date());
    setDateEnd(new Date());
    redirect(redirectBaseUrl);
  };

  return (
    <div className={styles.dateFilter}>
      <div className={styles.dateFilterFields}>
        <div className={styles.dateFilterField}>
          <span>С даты</span>
          <InputDate onChange={(val) => setDateStart(val)} value={dateStart} />
        </div>
        <div className={styles.dateFilterField}>
          <span>По дату</span>
          <InputDate onChange={(val) => setDateEnd(val)} value={dateEnd} />
        </div>
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
