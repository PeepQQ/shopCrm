"use client";
import styles from "./PanelStatistics.module.scss";
import { Graph } from "@/shared/components/Graph";
import { PanelSaleStatisticItem } from "@/entities/panel";
import { GraphTooltip } from "@/shared/components/GraphTooltip";

interface PanelStatisticsProps {
  weekSales: PanelSaleStatisticItem[];
  monthSales: PanelSaleStatisticItem[];
  yearSales: PanelSaleStatisticItem[];
}

export const PanelStatistics = ({
  weekSales,
  monthSales,
  yearSales,
}: PanelStatisticsProps) => {
  const graphsData = [
    { title: "Неделя", data: weekSales },
    { title: "Месяц", data: monthSales },
    { title: "Год", data: yearSales },
  ];

  return (
    <div className={styles.panelStatistics}>
      {graphsData.map((graph) => (
        <div key={graph.title}>
          <h4>{graph.title}</h4>
          <Graph
            data={graph.data}
            nameKey={"total"}
            valueKey={"total"}
            tooltipContent={(data) => {
              if (!data.total) return;
              return (
                <GraphTooltip>
                  <h5>Период</h5>
                  <p>{`${data.date.start} - ${data.date.end}`}</p>
                </GraphTooltip>
              );
            }}
          />
        </div>
      ))}
    </div>
  );
};
