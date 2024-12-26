'use client'; // Ensure this is at the top of the file

import React from 'react';
import { updateUser as updateUserApi } from '@/service/user'; // Import the API function
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';

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

  const handleNameChange = async (data: FormInputs) => {
    if (users) {
      try {
        await updateUserApi(users.id, { name: data.name });
        alert('Имя успешно обновлено!');
      } catch (error) {
        alert('Ошибка при обновлении имени: ' + error);
      }
    }
  };

  const handlePasswordChange = async (data: FormInputs) => {
    if (users && data.password) {
      try {
        await updateUserApi(users.id, { password: data.password });
        alert('Пароль успешно обновлен!');
      } catch (error) {
        alert('Ошибка при обновлении пароля: ' + error);
      }
    } else {
      alert('Введите новый пароль.');
    }
  };

  return (
    <div>
      {users ? (
        <div>
          <h1>Настройки пользователя {users.name}</h1>
          <p>Email: {users.email}</p>

          {/* Form for changing name */}
          <form onSubmit={handleSubmit(handleNameChange)}>
            <label>
              Новое имя:
              <Input
                type="text"
                defaultValue={users.name}
                {...register('name', { required: 'Имя обязательно' })}
                className='mt-2'
              />
              {errors.name && <span className="text-red-500">{errors.name.message}</span>}
            </label>
            <Button type="submit">Сменить имя</Button>
          </form>

          {/* Form for changing password */}
          <form onSubmit={handleSubmit(handlePasswordChange)} className="mt-4">
            <label>
              Новый пароль:
              <Input
                type="password"
                {...register('password', { required: 'Пароль обязателен' })}
                className='mt-2'
              />
              {errors.password && <span className="text-red-500">{errors.password.message}</span>}
            </label>
            <Button type="submit">Сменить пароль</Button>
          </form>
        </div>
      ) : (
        <p>Пользователь не найден.</p>
      )}
    </div>
  );
};

export default Settings;