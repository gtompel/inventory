"use client";
import React, { useState } from "react"; // Импортируем useState
import {
  Dialog,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { MdOutlineLogout } from "react-icons/md";
import { Button } from "../ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation"; // Используем useRouter из next/navigation

export default function Logout() {
  const router = useRouter(); // Получаем router с помощью useRouter
  const [isOpen, setIsOpen] = useState(false); // Состояние для управления открытием диалога
  const [message, setMessage] = useState(""); // Состояние для сообщения об ошибке или успехе

  const signOut = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            localStorage.clear(); // Очищаем хранилище
            setMessage("Вы успешно вышли из аккаунта."); // Устанавливаем сообщение об успехе
            setTimeout(() => {
              setIsOpen(false); // Закрываем диалог
              router.push("/auth"); // Переходим на страницу аутентификации
            }, 2000); // Пауза перед переходом, чтобы пользователь успел увидеть сообщение
          },
        },
      });
    } catch (error: unknown) { // Явно указываем тип
      if (error instanceof Error) {
        setMessage("Ошибка выхода: " + error.message); // Устанавливаем сообщение об ошибке
      } else {
        setMessage("Произошла неизвестная ошибка."); // Обработка не-Error объектов
      }
    }
  };

  const handleDialogOpen = () => {
    setIsOpen(true);
    setMessage(""); // Сбрасываем сообщение при открытии диалога
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}> {/* Устанавливаем состояние для управления открытием диалога */}
      <DialogTrigger className="hover:text-red-500" onClick={handleDialogOpen}>
        <MdOutlineLogout />
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Выйти из аккаунта?</DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-sm text-gray-500">
          Это действие завершит вашу сессию. Вы уверены, что хотите выйти?
        </DialogDescription>
        {message && (
          <div className="mt-4 text-sm text-green-500"> {/* Отображаем сообщение */}
            {message}
          </div>
        )}
        <DialogFooter className="sm:justify-start">
          <Button type="button" onClick={signOut}>
            Да, выйти
          </Button>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Отменить
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
