import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandList, CommandSeparator, CommandItem } from '../ui/command';
import { PlusCircleIcon } from 'lucide-react';
import { getUser, getAllUsers } from '@/service/task'; 
import UserProfile from '../user-team/userProfile';
import TeamList from '../user-team/teamList';
import UserList from '../user-team/userList';

export async function TeamSwitcher() {
  const user = await getUser();
  const allUsers = await getAllUsers(); // Получить всех пользователей для добавления в команды

  return (
    <Popover>
      <PopoverTrigger>
        <UserProfile user={user} />
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <Command>
          <CommandInput placeholder="Поиск..." />
          <CommandList>
            <CommandEmpty>
              Ничего не найдено
            </CommandEmpty>
            <CommandGroup heading="Мои команды">
              <TeamList teams={user?.teams || []} />
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Добавить пользователя в команду">
              <UserList users={allUsers} />
            </CommandGroup>
            <CommandSeparator />
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
}

export default TeamSwitcher;
