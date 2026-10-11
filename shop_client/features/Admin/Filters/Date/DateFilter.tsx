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

export const DateFilter = ({ redirectBaseUrl }: DateFilterProps) => {
  const [date, setDate] = useState<Date>(new Date());

  const handleSubmit = () => {
    const params = new URLSearchParams();
    params.set("date", formatDate(date));
    redirect(`${redirectBaseUrl}?${params}`);
  };

  return (
    <div className={styles.dateFilter}>
      <div className={styles.dateFilterField}>
        <span>Дата</span>
        <InputDate onChange={(e) => setDate(new Date(e.target.value))} />
      </div>
      <Button onClick={handleSubmit} size="sm">
        Применить
      </Button>
    </div>
  );
};
