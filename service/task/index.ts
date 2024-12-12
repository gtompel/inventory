"use server"


import prisma from "@/lib/prisma";
import { Prisma, Task } from "@prisma/client";
import { revalidatePath } from "next/cache";

function revalidatePageData() {
    revalidatePath("/", "layout")
}

export async function createTask(task: Prisma.TaskCreateArgs["data"]) {
    await prisma.task.create({
        data: {
            description: task.description || "",
            title: task.title,
            status: task.status,
            ownerId: task.ownerId as string
        }
    })
    revalidatePageData()

}

export async function getTasks() {
    const tasks = await prisma.task.findMany({
        orderBy: {
            createdAt: "desc",
        },
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
    const [count1, count2, count3] = await Promise.all([
        prisma.task.count({
            where: {
                status: "Ожидание"
            }
        }),
        prisma.task.count({
            where: {
                status: "В работе"
            }
        }),
        prisma.task.count({
            where: {
                status: "Выполнено"
            }
        })

        ])
    return { count1, count2, count3 }
}