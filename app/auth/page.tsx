"use client";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";
import React from 'react';

import { useRouter } from 'next/navigation';
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
    const [successMessage, setSuccessMessage] = useState<string | null>(null); // Состояние для сообщения об успехе
    const [isRegistering, setIsRegistering] = useState<boolean>(false); // Состояние для определения режима (вход или регистрация)
    const router = useRouter();

    const displayMessage = (message: string, isError: boolean) => {
        if (isError) {
            setError({ message, status: 400, statusText: 'Bad Request' });
            setSuccessMessage(null);
        } else {
            setSuccessMessage(message);
            setError(null);
        }

        setTimeout(() => {
            setError(null);       // Убираем сообщение об ошибке после задержки
            setSuccessMessage(null); // Убираем сообщение об успехе после задержки
        }, 3000); // Задержка в 3 секунды
    };

    const signin = async () => {
        displayMessage('', false); // Сбрасываем сообщения перед новым запросом
        try {
            const { error: signInError } = await authClient.signIn.email({
                email,
                password,
                fetchOptions: {
                    onSuccess: () => {
                        displayMessage('Вы успешно вошли в систему!', false); // Показываем сообщение об успехе
                        setTimeout(() => {
                            if (typeof window !== "undefined") {
                                localStorage.clear();
                                router.push('/');
                            }
                        }, 2000);
                    },
                },
            });
            if (signInError) {
                displayMessage('Ошибка входа: ' + signInError.message, true); // Показываем сообщение об ошибке
            }
        } catch (err) {
            if (err instanceof Error) {
                displayMessage(err.message, true); // Показываем сообщение об ошибке
            } else {
                displayMessage('Неизвестная ошибка', true); // Показываем сообщение об ошибке
            }
        }
    };

    const register = async () => {
        displayMessage('', false); // Сбрасываем сообщения перед новым запросом
        if (password !== confirmPassword) {
            displayMessage('Пароли не совпадают', true); // Показываем сообщение об ошибке
            return;
        }
        try {
            const { error: registerError } = await authClient.signUp.email({
                email,
                password,
                name: '',
                fetchOptions: {
                    onSuccess: () => {
                        displayMessage('Вы успешно зарегистрированы!', false); // Показываем сообщение об успехе
                        if (typeof window !== "undefined") {
                            localStorage.clear();
                            router.push('/');
                        }
                    },
                }
            });
            if (registerError) {
                displayMessage('Ошибка регистрации: ' + registerError.message, true); // Показываем сообщение об ошибке
            }
        } catch (err) {
            if (err instanceof Error) {
                displayMessage(err.message, true); // Показываем сообщение об ошибке
            } else {
                displayMessage('Неизвестная ошибка при регистрации', true); // Показываем сообщение об ошибке
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
                {successMessage && <p className='text-green-500'>{successMessage}</p>} {/* Выводим сообщение об успехе */}
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
