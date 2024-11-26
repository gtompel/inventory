import React from 'react'
import { Avatar as AvatarComp, AvatarFallback, AvatarImage } from '../ui/avatar'

export default function Avatar() {
  return (

    <AvatarComp className='mr-2 h-8 w-8'
    >
        <AvatarImage
        src='Evandro.png'
        alt="Laptev Dmitriy"
         />
         <AvatarFallback >
            LD
         </AvatarFallback>
    </AvatarComp>
  )
}


