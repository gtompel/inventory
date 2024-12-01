"use client"

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent
} from '../ui/chart'
import {
    Bar,
    BarChart,
    CartesianGrid,
    XAxis,
    Rectangle
} from 'recharts'

type Props = {
    data: {
        status: string,
        count: number,
        fill: string
    }[]
}

const chartConfig = {
    "Ожидание": {
        label: 'Ожидание'
    }, "В Работе": {
        label: 'В Работе'
    },
    "Выполнено": {
        label: 'Выполнено'
    }
}
export default function ChartsComp(props: Props) {
    const { data } = props
    return (
        <Card className='flex flex-col h-full'>
            <CardHeader className='flex items-center pb-0'>
                <CardTitle>Статистика</CardTitle>
                <CardDescription>Всего задач: {data.reduce((acc, item) => acc + item.count, 0)}
                </CardDescription>
            </CardHeader>
            <CardContent className='flex-1 pb-0'>
                <ChartContainer
                    config={chartConfig}
                    className='w-full h-full'>
                    <BarChart
                        accessibilityLayer
                        data={data}
                    >
                        <CartesianGrid vertical />
                        <XAxis
                            dataKey="status"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => chartConfig[value as keyof typeof chartConfig]?.label}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent
                                hideLabel
                                nameKey='status'
                                />}
                        />
                        <Bar
                        dataKey="count"
                        strokeWidth={2}
                        radius={[8, 8, 0, 0]}
                        >
                            {data.map((item, index) => (
                                <Rectangle
                                    key={index}
                                    fill={item.fill}
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}

