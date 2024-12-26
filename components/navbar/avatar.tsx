'use client'
import React from 'react'
import { Avatar as AvatarComp, AvatarFallback, AvatarImage } from '../ui/avatar'
import { authClient } from '@/lib/auth-client'

export default function Avatar() {
  const { data: session, isPending } = authClient.useSession()

  if (isPending) {
    return (
      <AvatarComp className='mr-2 h-8 w-8'>
        <AvatarFallback>LD</AvatarFallback>
      </AvatarComp>
    )
  }

  if (!session?.user?.image) {
    return (
      <AvatarComp className='mr-2 h-8 w-8'>
        <AvatarFallback>{session?.user?.name?.charAt(0) || 'U'}</AvatarFallback>
      </AvatarComp>
    )
  }

  return (
    <AvatarComp className='mr-2 h-8 w-8'>
      <AvatarImage
        src={session.user.image}
        alt={session.user.name || 'User Avatar'}
      />
      <AvatarFallback>{session?.user?.name?.charAt(0)}</AvatarFallback>
    </AvatarComp>
  )
}
