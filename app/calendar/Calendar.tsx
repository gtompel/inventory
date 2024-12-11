"use client"
import { Task } from '@prisma/client'
import React from 'react'
import { eachDayOfInterval, endOfMonth, startOfMonth } from 'date-fns'

type CalendarProps = {
    tasks: Task[]
}
export default function Calendar({tasks}: CalendarProps) {
    const currentDate = new Date()

    const firstDayOfMonth = startOfMonth(currentDate)
    const lastDayOfMonth = endOfMonth(currentDate)
    const dayInMonth = eachDayOfInterval({
        start: firstDayOfMonth,
        end: lastDayOfMonth
    })
  return (
    <div className="p-6">
        Календарь

    </div>
  )
}


