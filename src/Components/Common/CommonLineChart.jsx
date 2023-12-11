import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const data = [
    {
        name: 'Page A',
        UniqueCustomers: 4000,
        NewCustomers: 3000,
        oldCustomers: 2400,
        amt: 2400,
    },
    {
        name: 'Page B',
        UniqueCustomers: 3000,
        NewCustomers: 6000,
        oldCustomers: 1398,
        amt: 2210,
    },
    {
        name: 'Page C',
        UniqueCustomers: 2000,
        NewCustomers: 1000,
        oldCustomers: 9800,
        amt: 2290,
    },
    {
        name: 'Page D',
        UniqueCustomers: 2780,
        NewCustomers: 8000,
        oldCustomers: 3908,
        amt: 2000,
    },
    {
        name: 'Page E',
        UniqueCustomers: 1890,
        NewCustomers: 200,
        oldCustomers: 4800,
        amt: 2181,
    },
    {
        name: 'Page F',
        UniqueCustomers: 2390,
        NewCustomers: 4000,
        oldCustomers: 3800,
        amt: 2500,
    },
    {
        name: 'Page G',
        UniqueCustomers: 3490,
        NewCustomers: 5000,
        oldCustomers: 4300,
        amt: 2100,
    },
];
export default function CommonLineChart() {
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
                        bottom: 10
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="oldCustomers" stroke="#5D5FEF" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="UniqueCustomers" stroke="#3CD856" />
                    <Line type="monotone" dataKey="NewCustomers" stroke="#EB5757" />
                </LineChart>
            </ResponsiveContainer>
        </>
    )
}
