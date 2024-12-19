"use client";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";
import React from 'react';


import router from 'next/router';
import { Input } from '@/components/ui/input';

interface SignInError {
    code?: string;
    message?: string;
    status: number;
    statusText: string;
}

export default function Page() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>(''); // Поле для подтверждения пароля
    const [error, setError] = useState<SignInError | null>(null); // Укажем тип состояния ошибки как SignInError или null
    const [isRegistering, setIsRegistering] = useState<boolean>(false); // Состояние для определения режима (вход или регистрация)

    const signin = async () => {
        setError(null); // Сбрасываем ошибки перед новым запросом
        try {
            const { data, error: signInError } = await authClient.signIn.email({
                email,
                password,
            });
            router.push('/')

            if (signInError) {
                setError(signInError);
            } else {
                console.log('Вход успешен:', data);

            }
        } catch (err) {
            if (err instanceof Error) {
                setError({ message: err.message, status: 500, statusText: 'Internal Error' });
            } else {
                setError({ message: 'Неизвестная ошибка', status: 500, statusText: 'Unknown Error' });
            }
        }
    };

    const register = async () => {
        setError(null); // Сбрасываем ошибки перед новым запросом
        if (password !== confirmPassword) {
            setError({ message: 'Пароли не совпадают', status: 400, statusText: 'Bad Request' });
            return;
        }
        try {
            const { data, error: registerError } = await authClient.signUp.email({
              email,
              password,
              name: ''
            });
            router.push('/')

            if (registerError) {
                setError(registerError);
            } else {
                console.log('Регистрация успешна:', data);

            }
        } catch (err) {
            if (err instanceof Error) {
                setError({ message: err.message, status: 500, statusText: 'Internal Error' });
            } else {
                setError({ message: 'Неизвестная ошибка при регистрации', status: 500, statusText: 'Unknown Error' });
            }
        }
    };

    return (
        <div className='h-screen w-full flex justify-center items-center'>
            <div className='flex flex-col gap-4'>
                <Input
                    type='email'
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='border p-2 text-black placeholder-gray-400' // Добавлен text-black для видимости текста
                    required
                />
                <Input
                    type='password'
                    placeholder='Пароль'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='border p-2 text-black placeholder-gray-400' // Добавлен text-black для видимости текста
                    required
                />
                {isRegistering && (
                    <Input
                        type='password'
                        placeholder='Подтвердите пароль'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className='border p-2 text-black placeholder-gray-400' // Добавлен text-black для видимости текста
                        required
                    />
                )}
                {error && <p className='text-red-500'>{error.message}</p>}
                <Button className='flex items-center gap-1.5' onClick={isRegistering ? register : signin}>
                    {isRegistering ? <FaUserPlus /> : <FaSignInAlt />}
                    <span>{isRegistering ? 'Зарегистрироваться' : 'Войти'}</span>
                </Button>
                <Button
                    onClick={() => setIsRegistering(!isRegistering)}
                    className='text-blue-500 underline'
                >
                    {isRegistering ? 'Уже есть аккаунт? Войти' : 'Нет аккаунта? Зарегистрироваться'}
                </Button>
            </div>
        </div>
    );
}
