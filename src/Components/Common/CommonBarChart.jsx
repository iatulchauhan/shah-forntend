import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const data = [
  {
    name: "monday",
    OflineInvest: 14000,
    OnlineInvest: 22400,
  },
  {
    name: "Tuesday",
    OflineInvest: 20000,
    OnlineInvest: 11398,
  },
  {
    name: "Wednesday",
    OflineInvest: 10000,
    OnlineInvest: 19800,
  },
  {
    name: "Thursday",
    OflineInvest: 12780,
    OnlineInvest: 19908,
  },
  {
    name: "Friday",
    OflineInvest: 18890,
    OnlineInvest: 14800,
  },
  {
    name: "Saturday",
    OflineInvest: 9390,
    OnlineInvest: 12800,
  },
  {
    name: "Sunday",
    OflineInvest: 13490,
    OnlineInvest: 14300,
  }
];

export default function CommonBarChart() {
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
        <Bar dataKey="OnlineInvest" fill="#5D5FEF" />
        <Bar dataKey="OflineInvest" fill="#3CD856" />
      </BarChart>
    </ResponsiveContainer>
  );
}
