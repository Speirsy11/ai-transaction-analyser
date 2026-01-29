"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  cn,
  formatCurrency,
  formatPercent,
} from "@finance/ui";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

interface CategoryData {
  category: string;
  total: number;
  percentage: number;
}

interface CategoryBreakdownProps {
  data: CategoryData[];
  className?: string;
}

const COLORS = [
  "hsl(220, 70%, 50%)",  // blue
  "hsl(280, 65%, 60%)",  // purple
  "hsl(142, 76%, 36%)",  // green
  "hsl(38, 92%, 50%)",   // orange
  "hsl(340, 75%, 55%)",  // pink
  "hsl(180, 60%, 45%)",  // teal
  "hsl(45, 93%, 47%)",   // yellow
  "hsl(0, 84%, 60%)",    // red
  "hsl(200, 70%, 50%)",  // light blue
  "hsl(320, 70%, 50%)",  // magenta
];

export function CategoryBreakdown({ data, className }: CategoryBreakdownProps) {
  const total = data.reduce((sum, d) => sum + d.total, 0);

  // Take top 8 categories and group rest as "Other"
  const sortedData = [...data].sort((a, b) => b.total - a.total);
  const topCategories = sortedData.slice(0, 8);
  const otherTotal = sortedData.slice(8).reduce((sum, d) => sum + d.total, 0);

  const chartData = [
    ...topCategories,
    ...(otherTotal > 0
      ? [{ category: "Other", total: otherTotal, percentage: (otherTotal / total) * 100 }]
      : []),
  ];

  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle>Spending by Category</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="h-[280px] w-full lg:w-1/2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="total"
                  nameKey="category"
                >
                  {chartData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                      className="stroke-background stroke-2"
                    />
                  ))}
                </Pie>
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload?.[0]) {
                      const data = payload[0].payload;
                      return (
                        <div className="rounded-lg border bg-background p-3 shadow-lg">
                          <p className="font-medium">{data.category}</p>
                          <p className="text-lg font-semibold">
                            {formatCurrency(data.total)}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {formatPercent(data.percentage)}
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex-1 space-y-2">
            {chartData.map((item, index) => (
              <div
                key={item.category}
                className="flex items-center justify-between py-2 border-b last:border-0"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="font-medium">{item.category}</span>
                </div>
                <div className="text-right">
                  <p className="font-semibold tabular-nums">
                    {formatCurrency(item.total)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatPercent(item.percentage)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
