"use client"
import { Button } from '@/components/ui/button'
import { authClient } from '@/lib/auth-client'
import { FaSignInAlt } from "react-icons/fa";
import React from 'react'


export default function page() {
    const signin = async () => {
        await authClient.signIn


    }
  return (
    <div className='h-screen w-full flex justify-center items-center'>
        <Button className='flex items-center gap-1.5' onClick={signin}>
            <FaSignInAlt />
            <span>Войти</span>



        </Button>
      
    </div>
  )
}


