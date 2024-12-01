import { getTaskCount } from '@/service/task';
import React from 'react'
import ChartsComp from './charts';

export default async function Charts() {
    const count = await getTaskCount();
    const chartData = [{
        status: 'Ожидание',
        count: count.count1,
        fill: '#3b82f6'
    }, {
        status: 'В Работе',
        count: count.count2,
        fill: '#f59e0b'
    }, {
        status: 'Выполнено',
        count: count.count3,
        fill: '#22c55e'
    }]


    return (
        <ChartsComp data={chartData} />
  )
}