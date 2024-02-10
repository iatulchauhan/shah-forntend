import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function CommonBarChart({ totalRevenue }) {
   if (!Array.isArray(totalRevenue)) {
    console.error("totalRevenue is not an array");
    return null;
  }
  const data = totalRevenue.map((item) => ({
    name: item.day,
    Revenue: item.totalInvestment,
  }));
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart
        data={data}
        margin={{
          top: 30,
          right: 20,
          left: 10,
          bottom: 10
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis ticks={[0, 5000, 10000, 15000, 20000, 25000]} />
        <Tooltip />
        <Legend />
        <Bar dataKey="Revenue" fill="#3CD856" />
      </BarChart>
    </ResponsiveContainer>
  );
}
