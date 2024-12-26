'use server'
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";

// Получение текущего пользователя
export async function getUser() {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    // Если сессия недоступна, вернуть null
    if (!session) {
        return null;
    }

    // Получаем пользователя из базы данных по его электронной почте с командами
    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
        select: {
            id: true,
            name: true,
            email: true,
            image: true,
            emailVerified: true,
            teams: {
                select: { id: true, name: true },
            },
        },
    });

    return user; // Вернуть данные о пользователе
}

// Определите тип для обновляемого пользователя
type UpdateUserInput = {
    name?: string;
    email?: string;
    password?: string; // Добавляем поле пароля
};

export async function updateUser(userId: string, updatedData: UpdateUserInput) {
    try {
        return await prisma.user.update({
            where: { id: userId },
            data: {
                ...updatedData,
                ...(updatedData.password && { password: updatedData.password }), // Можете хешировать пароль перед сохранением
            },
        });
    } catch (error) {
        throw new Error('Ошибка при обновлении пользователя: ' + error);
    }
}

// Остальные функции остаются без изменений...
export async function getAllUsers() {
    return await prisma.user.findMany();
}

export async function createTeam(name: string) {
    return await prisma.team.create({ data: { name } });
}

export async function addUserToTeam(userId: string, teamId: string) {
    if (!userId || !teamId) {
        throw new Error('Invalid user ID or team ID');
    }

    return await prisma.user.update({
        where: { id: userId },
        data: { teams: { connect: { id: teamId } } },
    });
}
