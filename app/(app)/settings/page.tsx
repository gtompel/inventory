import React from 'react'
import Settings from './Settings'
import { getUser } from '@/service/user'


export default async function Page() {
  const users = await getUser()
  return (
    <div>
      <Settings users={users}/>
    </div>
  )
}


