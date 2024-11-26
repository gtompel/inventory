import React from 'react'
import { Popover, PopoverContent, PopoverTrigger  } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { CaretSortIcon } from "@radix-ui/react-icons"
import { Command, CommandInput } from '../ui/command'

export default function TeamSwitcher() {
  return (
    <Popover>
        <PopoverTrigger>
            <Button
            variant="outline"
            role='combobox'
            aria-label='Select a team'
            className='w-[200px] justify-between'
            >
                <Avatar className='mr-2 h-6 w-6'
                >
                    <AvatarImage
                    src='Evandro.png'
                    alt="Avatar"
                     />
                     <AvatarFallback>
                        LD
                     </AvatarFallback>
                </Avatar>
                Laptev Dmitriy
                <CaretSortIcon />
            </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <Command>
            <CommandInput placeholder="Search team..." />
          </Command>
        </PopoverContent>
    </Popover>
  )
}

