"use client";
import styles from "./DateFilter.module.scss";
import { useState } from "react";
import { Button } from "@/shared/components/Button";
import { formatDate } from "@/shared/config";
import { redirect } from "next/navigation";
import { InputDate } from "@/shared/components/InputDate";

interface DateFilterProps {
  redirectBaseUrl: string;
}

export const DateFilterRange = ({ redirectBaseUrl }: DateFilterProps) => {
  const [dateStart, setDateStart] = useState<Date>(new Date());
  const [dateEnd, setDateEnd] = useState<Date>(new Date());

  const handleSubmit = () => {
    const params = new URLSearchParams();
    params.set("dateStart", formatDate(dateStart));
    params.set("dateEnd", formatDate(dateEnd));
    redirect(`${redirectBaseUrl}?${params}`);
  };

  return (
    <div className={styles.dateFilter}>
      <div className={styles.dateFilterFields}>
        <div className={styles.dateFilterField}>
          <span>С даты</span>
          <InputDate onChange={(e) => setDateStart(new Date(e.target.value))} />
        </div>
        <div className={styles.dateFilterField}>
          <span>По дату</span>
          <InputDate onChange={(e) => setDateEnd(new Date(e.target.value))} />
        </div>
      </div>
      <Button onClick={handleSubmit} size="sm">
        Применить
      </Button>
    </div>
  );
};
