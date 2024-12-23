"use client";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";
import React from 'react';
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';



export default function Page() {
    const { toast } = useToast();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);

    const displayMessage = (message: string, isError: boolean) => {
        if (isError) {
            toast({
                title: 'Ошибка',
                description: message,
                duration: 5000
             });
        } else {
            toast({
                title: 'Успех',
                description: message,
                duration: 5000
             });
        }
    };

    const signin = async () => {
        displayMessage('', false);
        try {
            const { error: signInError } = await authClient.signIn.email({
                email,
                password,
                fetchOptions: {
                    onSuccess: () => {
                        displayMessage('Вы успешно вошли в систему!', false);
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
                displayMessage('Ошибка входа: ' + signInError.message, true);
            }
        } catch (err) {
            displayMessage(err instanceof Error ? err.message : 'Неизвестная ошибка', true);
        }
    };

    const register = async () => {
        displayMessage('', false);
        if (password !== confirmPassword) {
            displayMessage('Пароли не совпадают', true);
            return;
        }
        try {
            const { error: registerError } = await authClient.signUp.email({
                email,
                password,
                name: '',
                fetchOptions: {
                    onSuccess: () => {
                        displayMessage('Вы успешно зарегистрированы!', false);
                        if (typeof window !== "undefined") {
                            localStorage.clear();
                            router.push('/');
                        }
                    },
                }
            });
            if (registerError) {
                displayMessage('Ошибка регистрации: ' + registerError.message, true);
            }
        } catch (err) {
            displayMessage(err instanceof Error ? err.message : 'Неизвестная ошибка при регистрации', true);
        }
    };

    const router = useRouter();

    return (
        <div className='h-screen w-full flex justify-center items-center'>
            <div className='flex flex-col gap-4  '>
                <Input
                    type='email'
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='border p-2 px-3 h-10 text-white placeholder-gray-400 '
                    required
                />
                <Input
                    type='password'
                    placeholder='Пароль'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='border p-2 px-3 h-10 text-white placeholder-gray-400'
                    required
                />

                {isRegistering && (
                    <Input
                        type='password'
                        placeholder='Подтвердите пароль'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className='border p-2 px-3 h-10 text-white placeholder-gray-400 '
                        required
                    />
                )}
                <Button className='flex items-center gap-1.5' onClick={isRegistering ? register : signin}>
                    {isRegistering ? <FaUserPlus /> : <FaSignInAlt />}
                    <span>{isRegistering ? 'Зарегистрироваться' : 'Войти'}</span>
                </Button>
                <Button
                    onClick={() => setIsRegistering(!isRegistering)}
                    className='text-gray-400 underline p-2 px-3 h-10'
                >
                    {isRegistering ? 'Уже есть аккаунт? Войти' : 'Нет аккаунта? Регистрация'}
                </Button>
            </div>
        </div>
    );
};