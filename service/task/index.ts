"use server"

import { FormSchema } from "@/components/task-form/schema";
import prisma from "@/lib/prisma";

export async function createTask(task:FormSchema) {
    await prisma.task.create({
        data:{
            description: task.description || "",
            title: task.title,
            status: task.status
        }
    })

}