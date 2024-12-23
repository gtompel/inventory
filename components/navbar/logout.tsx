"use client";
import React, { useState } from "react";
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
import { useToast } from '@/hooks/use-toast'; // Импортируем useToast

export default function Logout() {
  const { toast } = useToast(); // Получаем toast из useToast
  const router = useRouter(); // Получаем router с помощью useRouter
  const [isOpen, setIsOpen] = useState(false); // Состояние для управления открытием диалога

  const signOut = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            localStorage.clear(); // Очищаем хранилище
            toast({
              title: "Вы успешно вышли из системы!",
              description: "Возвращайтесь снова!",
              duration: 3000
             }); // Показываем сообщение об успехе
            setTimeout(() => {
              setIsOpen(false); // Закрываем диалог
              router.push("/auth"); // Переходим на страницу аутентификации
            }, 2000); // Пауза перед переходом, чтобы пользователь успел увидеть сообщение
          },
        },
      });
    } catch (error: unknown) { // Явно указываем тип
      if (error instanceof Error) {
        toast({
          title: "Произошла ошибка.",
          description: error.message,
          duration: 3000
         }); // Показываем сообщение об ошибке
      } else {
        toast({
          title: "Произошла ошибка.",
          description: "Неизвестная ошибка.",
          duration: 3000
        }); // Обработка не-Error объектов
      }
    }
  };

  const handleDialogOpen = () => {
    setIsOpen(true);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
