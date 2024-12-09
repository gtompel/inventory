import React from 'react'
import { Dialog, DialogTrigger } from '../ui/dialog'
import { MdOutlineLogout } from 'react-icons/md'

export default function Logout() {
  return (
    <Dialog>
      <DialogTrigger className='hover:text-red-500'>
        <MdOutlineLogout />
      </DialogTrigger>
    </Dialog>
  )
}

