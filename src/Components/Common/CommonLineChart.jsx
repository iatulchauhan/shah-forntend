import React, { PureComponent } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function CommonLineChart({ visitorInsights }) {
  console.log(visitorInsights, "visitorInsights");
  const data = visitorInsights.map((item) => ({
    name: item.label,
    // UniqueCustomers: item.value,
    Visitor: item.value,
    // oldCustomers: item.value,
    amt: item.value,
  }));
  return (
    <>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 30,
            right: 50,
            left: 10,
            bottom: 10,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          {/* <Line
            type="monotone"
            dataKey="oldCustomers"
            stroke="#5D5FEF"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="UniqueCustomers" stroke="#3CD856" /> */}
          <Line type="monotone" dataKey="Visitor" stroke="#EB5757" />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}
