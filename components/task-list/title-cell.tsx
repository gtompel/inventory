"use client"
import { Task } from '@prisma/client'
import React, { useState } from 'react'
import Modal from '../ui/modal'

type Props = {
    task: Task
    
}

export default function TitleCell(props: Props) {
    const {task} = props
    const [isOpen, setIsOpen] =useState(false);
    const open = () => {
        setIsOpen(true);
    }
    const close = () => {
        setIsOpen(false);
    }
  return (
    <>
    <span onClick={open} className='hover:underline cursor-pointer'>
        {task.title}
        </span>
        <Modal title='Детали задачи' isOpen={isOpen} close={close}>
            <div className='min-w-[500px]'>

            </div>
        </Modal>

    </>
  )
}


