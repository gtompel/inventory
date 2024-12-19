"use client";
import React from "react";
import {
  Dialog,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogDescription
} from "../ui/dialog";
import { MdOutlineLogout } from "react-icons/md";
import { Button } from "../ui/button";
import { authClient } from "@/lib/auth-client";
import router from "next/router";


export default function Logout() {


  const signOut = () => {
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/auth");
        },
      },
    });
  };

  return (
    <Dialog >
      <DialogTrigger className="hover:text-red-500">
        <MdOutlineLogout />
      </DialogTrigger>

      <DialogContent

        className="sm:max-w-[425px]"
      >
        <DialogHeader>
        <DialogTitle >Выйти из аккаунта?</DialogTitle>
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
