"use server"

import { FormSchema } from "@/components/task-form/schema";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createTask(task:FormSchema) {
    await prisma.task.create({
        data:{
            description: task.description || "",
            title: task.title,
            status: task.status
        }
    })
    revalidatePath("/","layout")

}

export async function getTasks() {
    const tasks = await prisma.task.findMany({
        orderBy: {
            createdAt: "desc",
        },
    })
    return tasks
}