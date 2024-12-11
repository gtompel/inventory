import Link from 'next/link'
import React from 'react'

export default function Links() {
  return (
    <div className='flex items-center space-x-4 lg:space-x-6'>
        <Link href='/' className='text-sm font-medium transition-colors hover:text-primary'>
        Задачи
        </Link>
        <Link href='/calendar' className='text-muted text-sm font-medium transition-colors hover:text-primary'>Календарь</Link>
        <span className='text-muted text-sm font-medium transition-colors hover:text-primary'>Настройки</span>
      
    </div>
  )
}


