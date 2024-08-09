"use client";

import { brdata } from "@/app/dummydata";
import { Bar, BarChart ,ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";

export default async function BarCharts() {
  
  

  return (
    <ResponsiveContainer width={'100%'} height={350}>
        <BarChart data={brdata}>
            <XAxis
            dataKey={'month'}
            tickLine={false}
            axisLine={false}
            stroke="#888888"
            fontSize={12}/>
            <YAxis
            tickLine={false}
            axisLine={false}
            stroke="#888888"
            fontSize={12}
            tickFormatter={(value)=> `$${value}`}
            />
            <Tooltip cursor={{fill: "hsl(var(--muted))"}}/>
            <Bar dataKey={'donation'}
            fill="#FF4162"
            radius={[4,4,0,0]}/>
        </BarChart>

    </ResponsiveContainer>
  )
}