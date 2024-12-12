"use client"
import { Task } from '@prisma/client'
import React from 'react'
import {
  eachDayOfInterval,
  endOfMonth,
  getDay,
  startOfMonth,
  format,
  isToday
} from 'date-fns'
import StatusBullet from '@/components/StatusBullet'
import { TaskStatus } from '@/components/task-form/schema'
import { cn } from '@/lib/utils'

type CalendarProps = {
  tasks: Task[]
}

const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
export default function Calendar({ tasks }: CalendarProps) {
  const currentDate = new Date()

  const firstDayOfMonth = startOfMonth(currentDate)
  const lastDayOfMonth = endOfMonth(currentDate)
  const dayInMonth = eachDayOfInterval({
    start: firstDayOfMonth,
    end: lastDayOfMonth
  })
  const startingDayIdx = getDay(firstDayOfMonth) - 1 < 0 ? 6 : getDay(firstDayOfMonth) - 1
  const tasksGroupedByDate = tasks.reduce((acc: Record<string, Task[]>, task) => {
    const datekey = format(task.createdAt, 'PPP');
    if (!acc[datekey])
      acc[datekey] = [];
    acc[datekey].push(task);
    return acc
  }, {}
  )
  return (
    <div className="p-6">
      <div className='grid grid-cols-7 gap-1'>
        {weekDays.map(w => (
          <span className='font-medium' key={w}>
            {w}
          </span>

        ))}
        {Array.from({ length: startingDayIdx }).map((_, idx) => (
          <div className='bg-secondary/65 min-h-44' key={idx} />
        ))}
        {dayInMonth.map((date) => (
          <div key={date.toISOString()}
            className='bg-secondary relative flex items-end p-1 min-h-44 h-full group'>
            <div className='space-y-1 w-full'>
              {(tasksGroupedByDate[format(date, 'PPP')] || []).map((task) => (
                <div
                  className='bg-zinc-700 hover:brightness-125 transition-all rounded shadow p-2 text-sm'
                  key={task.id}
                >
                  <span className='block truncate font-medium text-left'>{task.title}</span>
                  <p className='truncate'>{task.description}</p>
                  <StatusBullet status={task.status as TaskStatus} />
                </div>

              ))}
            </div>
            <div className={cn(
              "font-black absolute top-4 right-4 w-6 h-6 text-sm flex justify-center items-center rounded p-2 shadow",
              isToday(date)
                ? "bg-red-500 text-white"
                : "bg-white text-zinc-600"
            )}>
              {date.getDate()}

            </div>
          </div>
        ))}
      </div>
    </div>
  )
}


