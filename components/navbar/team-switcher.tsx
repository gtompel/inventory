import React from 'react'
import { Popover, PopoverContent, PopoverTrigger  } from '../ui/popover'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { CaretSortIcon } from "@radix-ui/react-icons"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from '../ui/command'
import { PlusCircleIcon } from 'lucide-react'

const groups = [
  {
    label: "Персональный Аккаунт",
    teams: [
      {
        label: "Laptev Dmitriy"
      },
    ]
  },
  {
    label: "Команда",
    teams: [
      {
        label: "Laptev Dmitriy1"
      },
      {
        label: "Laptev Dmitriy2"
      },
      {
        label: "Laptev Dmitriy3"
      },
    ]
  },
]
export default function TeamSwitcher() {
  return (
    <Popover>
        <PopoverTrigger>
            <div

            aria-label='Select a team'
            className='px-3 py-2 transition-all flex hover:bg-secondary rounded-2xl items-center gap-1.5 w-[200px] justify-between border'
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
            </div>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <Command>
            <CommandInput placeholder="Поиск..." />
            <CommandList>
              <CommandEmpty>
                Ничего не найдено
              </CommandEmpty>
                {groups.map((group) => (
                  <CommandGroup key={group.label} heading={group.label}>
                    {group.teams.map((team) => (
                      <CommandItem key={team.label} className='text-sm'>
                        <Avatar className='mr-2 h-6 w-6'
                        >
                            <AvatarImage
                            src='222.png'
                            alt={team.label}
                             />
                             <AvatarFallback className='uppercase'>
                                {team.label}
                             </AvatarFallback>
                        </Avatar>
                        <span>{team.label}</span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                ))}
            </CommandList>
            <CommandSeparator />
            <CommandList>
              <CommandGroup>
                <CommandItem>
                  <PlusCircleIcon className='mr-2 h-5 w-5' />
                  <span>Добавить команду</span>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
    </Popover>
  )
}

