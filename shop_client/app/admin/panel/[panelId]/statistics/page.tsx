import { PanelStatistics } from "@/widgets/Admin/Panel";
import { getPanelSaleStatistics } from "@/shared/api/server/Panel.server.api";
import { type PageProps } from "@/app/next.type";
import {
  formatDate,
  startOfWeek,
  startOfMonth,
  startOfYear,
  endOfYear,
  endOfMonth,
  endOfWeek,
} from "date-fns";

export default async function PanelStatisticsPage({ params }: PageProps) {
  const { panelId } = await params;

  const now = new Date();
  const weekFirstDay = formatDate(
    startOfWeek(now, { weekStartsOn: 1 }),
    "yyyy-MM-dd",
  );
  const monthFirstDay = formatDate(startOfMonth(now), "yyyy-MM-dd");
  const yearFirstDay = formatDate(startOfYear(now), "yyyy-MM-dd");

  const [weekSales, monthSales, yearSales] = await Promise.all([
    getPanelSaleStatistics({
      panelId,
      data: {
        dateStart: weekFirstDay,
        dateEnd: formatDate(endOfWeek(now, { weekStartsOn: 1 }), "yyyy-MM-dd"),
        splitType: "day",
      },
    }),
    getPanelSaleStatistics({
      panelId,
      data: {
        dateStart: monthFirstDay,
        dateEnd: formatDate(endOfMonth(now), "yyyy-MM-dd"),
        splitType: "day",
      },
    }),
    getPanelSaleStatistics({
      panelId,
      data: {
        dateStart: yearFirstDay,
        dateEnd: formatDate(endOfYear(now), "yyyy-MM-dd"),
        splitType: "month",
      },
    }),
  ]);

  return (
    <PanelStatistics
      weekSales={weekSales}
      monthSales={monthSales}
      yearSales={yearSales}
    />
  );
}
