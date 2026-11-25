import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Bar,
  BarChart,
} from "recharts";

interface GraphProps<T> {
  data: T[];
  nameKey: Extract<keyof T, string>;
  valueKey: Extract<keyof T, string>;
  valueLabel?: string;
  tooltipContent: (data: T) => React.ReactNode;
}

export const Graph = <T,>({
  data,
  nameKey,
  valueKey,
  tooltipContent,
}: GraphProps<T>) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid stroke="var(--border-active)" strokeDasharray="4 4" />
        <XAxis
          dataKey={nameKey}
          tick={{
            fill: "var(--text-secondary",
            fontSize: 14,
            fontFamily: "var(--font-text)",
          }}
          axisLine={{ stroke: "var(--border)", strokeWidth: 1 }}
        />
        <YAxis
          tick={{
            fill: "var(--text-secondary",
            fontSize: 14,
            fontFamily: "var(--font-text)",
          }}
          axisLine={{ stroke: "var(--border)", strokeWidth: 1 }}
        />
        <Tooltip
          contentStyle={{
            background: "var(--surface)",
            border: "1px var(--border) solid",
          }}
          content={({ payload }) => {
            const data = payload?.[0]?.payload as T;
            if (!data) return null;
            return tooltipContent(data);
          }}
          cursor={false}
        />
        <Bar
          type="monotone"
          dataKey={valueKey}
          stroke="var(--border)"
          fill={"var(--surface-elevated)"}
          activeBar={{ fill: "var(--surface-active)" }}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};
