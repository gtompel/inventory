'use client'; // Ensure this is at the top of the file

import React from 'react';
import { updateUser as updateUserApi } from '@/service/user'; // Import the API function
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast'; // Импортируйте ваш пользовательский хук

// Define the User type
type User = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  teams: { id: string; name: string }[];
};

// Define the props type for the Settings component
type SettingsProps = {
  users: User | null; // users can be null
};

// Define the form inputs type
type FormInputs = {
  name: string;
  password: string;
};

const Settings: React.FC<SettingsProps> = ({ users }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  const { toast } = useToast(); // Используйте ваш пользовательский хук для получения функции toast

  const handleNameChange = async (data: FormInputs) => {
    if (users) {
      try {
        await updateUserApi(users.id, { name: data.name });
        toast({
          title: 'Успех',
          description: 'Имя успешно обновлено!',
        });
      } catch (error) {
        toast({
          title: 'Ошибка',
          description: 'Ошибка при обновлении имени: ' + error,
        });
      }
    }
  };

  const handlePasswordChange = async (data: FormInputs) => {
    if (users && data.password) {
      try {
        await updateUserApi(users.id, { password: data.password });
        toast({
          title: 'Успех',
          description: 'Пароль успешно обновлён!',
        });
      } catch (error) {
        toast({
          title: 'Ошибка',
          description: 'Ошибка при обновлении пароля: ' + error,
        });
      }
    } else {
      toast({
        title: 'Предупреждение',
        description: 'Введите новый пароль.',
      });
    }
  };

  return (
    <div className='flex flex-col p-4 justify-center items-center'>
      {users ? (
        <div className='w-full max-w-md'>
          <h1 className='text-2xl font-bold'>Настройки пользователя - {users.name}</h1>
          <p className='text-gray-600'>Email: {users.email}</p>

          {/* Form for changing name */}
          <form onSubmit={handleSubmit(handleNameChange)} className='mt-6'>
            <label className='block text-sm font-medium text-gray-700'>
              Новое имя:
              <Input
                type="text"
                defaultValue={users.name}
                {...register('name', { required: 'Имя обязательно' })}
                className='mt-1 block w-full p-2 text-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition duration-150 ease-in-out'
              />
              {errors.name && <span className="text-red-500 mt-1 text-sm">{errors.name.message}</span>}
            </label>
            <Button
              className='mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition duration-150 ease-in-out'
              type="submit">
              Сменить имя
            </Button>
          </form>

          {/* Form for changing password */}
          <form onSubmit={handleSubmit(handlePasswordChange)} className="mt-4">
            <label className='block text-sm font-medium text-gray-700'>
              Новый пароль:
              <Input
                type="password"
                {...register('password', { required: 'Пароль обязателен' })}
                className='mt-1 block w-full p-2  text-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition duration-150 ease-in-out'
              />
              {errors.password && <span className="text-red-500 mt-1 text-sm">{errors.password.message}</span>}
            </label>
            <Button
              className='mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition duration-150 ease-in-out'
              type="submit">
              Сменить пароль
            </Button>
          </form>
        </div>
      ) : (
        <p className='text-red-500'>Пользователь не найден.</p>
      )}
    </div>
  );
};

export default Settings;
