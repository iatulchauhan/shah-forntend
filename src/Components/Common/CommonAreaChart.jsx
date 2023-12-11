import React, { PureComponent } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const data = [
    {
        name: 'Page A',
        uv: 4000,
        pv: 2400,
        amt: 0,
    },
    {
        name: 'Page B',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'Page C',
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: 'Page D',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'Page E',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'Page F',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: 'Page G',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
];

export default function CommonAreaChart() {
    return (
            <ResponsiveContainer width="100%" height={350}>
                <AreaChart
                    width={500}
                    height={400}
                    data={data}
                    margin={{
                        top: 10,
                        right: 10,
                        left: 10,
                        bottom: 10,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="uv" stackId="1" stroke="#5D5FEF" fill="#5D5FEF" />
                    <Area type="monotone" dataKey="pv" stackId="1" stroke="#3CD856" fill="#3CD856" />

                </AreaChart>
            </ResponsiveContainer>
 
    )
}