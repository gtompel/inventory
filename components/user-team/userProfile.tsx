import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { CaretSortIcon } from '@radix-ui/react-icons';

// Определите интерфейс для объекта User
interface User {
  id: string; // или number, в зависимости от типа ID
  email: string;
  image?: string | null; // Изображение может отсутствовать или быть null
  name: string; // Новое поле: имя пользователя
  emailVerified: boolean; // Флаг для проверки электронной почты
  teams: { id: string; name: string; }[]; // Команды пользователя
}

interface UserProfileProps {
  user: User | null; // Разрешите user быть null
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  return (
    <div
      aria-label='Select a team'
      className='px-3 py-2 transition-all flex hover:bg-secondary rounded-2xl items-center gap-1.5 w-[200px] justify-between border'
    >
      <Avatar className='mr-2 h-6 w-6'>
        <AvatarImage
          src={user?.image || '222.png'} // Используйте изображение пользователя или изображение по умолчанию
          alt="Avatar"
        />
        <AvatarFallback>
          {user ? user.email.charAt(0).toUpperCase() : 'U'} {/* Предостережение при отсутствии пользователя */}
        </AvatarFallback>
      </Avatar>
      {user ? user.email : 'Неизвестный пользователь'} {/* Сообщение, если пользователь null */}
      <CaretSortIcon />
    </div>
  );
};

export default UserProfile;
