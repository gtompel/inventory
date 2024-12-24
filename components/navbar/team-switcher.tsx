import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { CaretSortIcon } from '@radix-ui/react-icons';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from '../ui/command';
import { PlusCircleIcon } from 'lucide-react';
import { getUser } from '@/service/task';


export async function TeamSwitcher() {
  const users = await getUser();
  const user = users ? users : null;


  return (
    <Popover>
        <PopoverTrigger>
            <div
                aria-label='Select a team'
                className='px-3 py-2 transition-all flex hover:bg-secondary rounded-2xl items-center gap-1.5 w-[200px] justify-between border'
            >
                <Avatar className='mr-2 h-6 w-6'>
                    <AvatarImage
                        src={user?.image || '222.png'} // Use user image or default image
                        alt="Avatar"
                    />
                    <AvatarFallback>
                        {user?.email.charAt(0).toUpperCase() || 'U'} {/* Initial of the name */}
                    </AvatarFallback>
                </Avatar>
                {user?.email || 'Неизвестный пользователь'}
                <CaretSortIcon />
            </div>
        </PopoverTrigger>
        <PopoverContent className="w-80">
            <Command>
                <CommandInput placeholder="Поиск..." />
                <CommandList>
                    <CommandEmpty>
                        Ничего не найдено
                    </CommandEmpty>
                    <CommandGroup heading="Мои команды">
                        {user?.teams.length === 0 ? (
                            <CommandItem className='text-sm'>
                                У вас нет команд
                            </CommandItem>
                        ) : (
                            user?.teams.map((team) => (
                                <CommandItem key={team.id} className='text-sm'>
                                    <Avatar className='mr-2 h-6 w-6'>
                                        <AvatarImage
                                            src='' // Set image for the team
                                            alt={team.name}
                                        />
                                        <AvatarFallback className='uppercase'>
                                            {team.name.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <span>{team.name}</span>
                                </CommandItem>
                            ))
                        )}
                    </CommandGroup>
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
);
};

export default TeamSwitcher;