import React from 'react';
import { CommandItem } from '../ui/command';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

// Обновленный интерфейс User
interface User {
  id: string; // Обратите внимание, что id теперь строка
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string | null; // Изображение может отсутствовать или быть null
  createdAt: Date; // Дата создания пользователя
  updatedAt: Date; // Дата обновления пользователя
}

interface UserListProps {
  users: User[]; // Массив пользователей
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  return (
    <>
      {users.length === 0 ? (
        <CommandItem className='text-sm'>
          Нет доступных пользователей
        </CommandItem>
      ) : (
        users.map((user) => (
          <CommandItem key={user.id} className='text-sm'>
            <Avatar className='mr-2 h-6 w-6'>
              <AvatarImage
                src={user.image || '222.png'} // Используйте изображение пользователя или изображение по умолчанию
                alt={user.email}
              />
              <AvatarFallback>
                {user.email.charAt(0).toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
            <span>{user.email}</span>
          </CommandItem>
        ))
      )}
    </>
  );
};

export default UserList;
