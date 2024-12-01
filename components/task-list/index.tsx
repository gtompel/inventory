import React from 'react'
import { CardDescription, CardTitle } from '../ui/card'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow } from '../ui/table'
  import { getTasks } from '@/service/task'
import { getDate } from '@/utils/getDate'
import StatusBullet from '../StatusBullet'
import { TaskStatus } from '../task-form/schema'
import TitleCell from './title-cell'

export default async function List() {
  const tasks = await getTasks()
  return (
    <div className='space-y-4'>
      <div className='space-y-2'>
        <CardTitle>Задачи</CardTitle>
        <CardDescription>Список задач</CardDescription>
      </div>
      <Table className='w-full h-full'>
        <TableCaption>Список твоих задач</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Название</TableHead>
            <TableHead>Описание</TableHead>
            <TableHead>Статус</TableHead>
            <TableHead>Дата создания</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id} className='group'>
              <TitleCell task={task} />
              <TableCell>{task.description}</TableCell>
              <TableCell className='capitalize flex items-center gap-1.5'>
                <StatusBullet status={task.status as TaskStatus} /></TableCell>
              <TableCell className='font-medium'>{getDate(task.createdAt)}</TableCell>
            </TableRow>
          ))}

        </TableBody>
      </Table>

    </div>
  )
}


