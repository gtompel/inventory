import React from 'react';
import { CommandItem } from '../ui/command';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

// Определите интерфейс для объекта `Team`
interface Team {
  id: string; // ID команды
  name: string; // Название команды
  // Добавьте другие поля по необходимости (например, изображение и т.д.)
}

interface TeamListProps {
  teams: Team[]; // Массив объектов Team
}

const TeamList: React.FC<TeamListProps> = ({ teams }) => {
  return (
    <>
      {teams.length === 0 ? (
        <CommandItem className='text-sm'>
          У вас нет команд
        </CommandItem>
      ) : (
        teams.map((team) => (
          <CommandItem key={team.id} className='text-sm'>  {/* Изменено на team.id */}
            <Avatar className='mr-2 h-6 w-6'>
              <AvatarImage
                src='' // Установите изображение для команды
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
    </>
  );
};

export default TeamList;
