import React from 'react'
import Calendar from './Calendar'
import { getTasks } from '@/service/task'

export default async function Page() {
  const tasks = await getTasks()
  return (
    <div>
      <Calendar tasks={tasks}/>
    </div>
  )
}


