"use server"
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { Prisma, Task } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";



function revalidatePageData() {
    revalidatePath("/", "layout")
}

export async function createTask(task: Prisma.TaskCreateArgs["data"]) {
    await prisma.task.create({
        data: {
            description: task.description || "",
            title: task.title,
            status: task.status,
            ownerId: task.ownerId as string,
            createdAt: task.createdAt
        }
    })
    revalidatePageData()


}

export async function searchTasks(searchTerm: string) {
    return await prisma.task.findMany({
        where: {
            OR: [
                { title: { contains: searchTerm, mode: 'insensitive' } },
                { description: { contains: searchTerm, mode: 'insensitive' } }
            ]
        }
    });
}

export async function getTasks() {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    const userId = session?.user.id
    const tasks = await prisma.task.findMany({
        orderBy: {
            createdAt: "desc",
        },
        where: {
            ownerId: userId
        }
    })
    return tasks
}

export async function deleteTask(id: string) {
    await prisma.task.delete({
        where: {
            id
        }
    })

    revalidatePageData()
}

export async function updateTask(task: Task) {
    await prisma.task.update({
        where: {
            id: task.id
        },
        data: task
    })
    revalidatePageData()
}

export async function getTaskCount() {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    const userId = session?.user.id
    const [count1, count2, count3] = await Promise.all([
        prisma.task.count({
            where: {
                status: "Ожидание",
                ownerId: userId
            }
        }),
        prisma.task.count({
            where: {
                status: "В работе",
                ownerId: userId
            }
        }),
        prisma.task.count({
            where: {
                status: "Выполнено",
                ownerId: userId
            }
        })

        ])
    return { count1, count2, count3 }
}

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
        where: {
            email: session.user.email,
        },
        select: {
            id: true,
            name: true,
            email: true,
            image: true,
            emailVerified: true,
            teams: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
    });

    return user; // Вернуть данные о пользователе
}
