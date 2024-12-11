"use client"
import React from 'react'
import {
  Dialog,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogTitle
} from '../ui/dialog'
import { MdOutlineLogout } from 'react-icons/md'
import { Button } from '../ui/button'
import { authClient } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'

export default function Logout() {
  const router = useRouter()
  const signOut = () => {
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push('/auth')
        }

      }
    })

  }
  return (
    <Dialog>
      <DialogTrigger className='hover:text-red-500'>
        <MdOutlineLogout />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Выйти из аккаунта?</DialogTitle>

        </DialogHeader>
        <DialogFooter className='sm:justify-start'>
          <Button type='button' onClick={signOut}>
            Да, выйти
          </Button>
          <DialogClose asChild>
            <Button type='button' variant="secondary">Отменить</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

