'use client';
import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';

export default function Links() {
  const pathname = usePathname();

  return (
    <div className='flex items-center space-x-4 lg:space-x-6'>
      <Link href='/' className={`text-sm font-medium transition-colors ${pathname === '/' ? 'text-blue-600' : 'text-gray-500 opacity-60 hover:text-blue-600'}`}>
        Задачи
      </Link>
      <Link href='/calendar' className={`text-sm font-medium transition-colors ${pathname === '/calendar' ? 'text-blue-600' : 'text-gray-500 opacity-60 hover:text-blue-600'}`}>
        Календарь
      </Link>
      <Link href='/settings' className={`text-sm font-medium transition-colors ${pathname === '/settings' ? 'text-blue-600' : 'text-gray-500 opacity-60 hover:text-blue-600'}`}>
        Настройки
      </Link>
    </div>
  );
}